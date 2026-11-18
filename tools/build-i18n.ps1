# Builds the per-language translation files the site loads (i18n/es.json,
# zh.json, de.json, fr.json) from the source files in i18n/source/.
#
# Each source file holds entries like
#   ["English text", "Spanish", "Chinese (Simplified)", "German", "French"]
# so every string is written once with all its translations side by side.
#
# Run from the repo folder after editing a source file:
#   powershell -ExecutionPolicy Bypass -File tools\build-i18n.ps1
#
# A language file's "reviewed" flag is kept as it is, so once a fluent
# speaker has checked a language, set "reviewed": true in its file (the menu
# then stops showing "Beta") and rebuilding won't undo it.

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$sourceDir = Join-Path $root 'i18n\source'
# Language names are written with character codes so this file stays plain
# ASCII (Windows PowerShell misreads other characters in scripts).
$langs = @(
  @{ code = 'es'; name = ('Espa' + [char]0xF1 + 'ol'); col = 1 },
  @{ code = 'zh'; name = (-join ([char[]](0x4E2D, 0x6587, 0xFF08, 0x7B80, 0x4F53, 0xFF09))); col = 2 },
  @{ code = 'de'; name = 'Deutsch'; col = 3 },
  @{ code = 'fr'; name = ('Fran' + [char]0xE7 + 'ais'); col = 4 }
)
$utf8 = New-Object System.Text.UTF8Encoding $false

$entries = @(); $patterns = @()
Get-ChildItem $sourceDir -Filter *.json | Sort-Object Name | ForEach-Object {
  $data = [IO.File]::ReadAllText($_.FullName, $utf8) | ConvertFrom-Json
  if ($data.strings) { $entries += ,@($data.strings) }
  if ($data.patterns) { $patterns += ,@($data.patterns) }
}
$entries = $entries | ForEach-Object { $_ }
$patterns = $patterns | ForEach-Object { $_ }

foreach ($L in $langs) {
  $out = Join-Path $root ('i18n\' + $L.code + '.json')
  $reviewed = $false
  if (Test-Path $out) {
    try { $old = [IO.File]::ReadAllText($out, $utf8) | ConvertFrom-Json; if ($old.meta.reviewed -eq $true) { $reviewed = $true } } catch {}
  }
  $strings = [ordered]@{}
  foreach ($e in $entries) {
    $en = [string]$e[0]; $tr = [string]$e[$L.col]
    if (-not $en -or -not $tr) { continue }
    if ($strings.Contains($en) -and $strings[$en] -ne $tr) { Write-Warning ("Two translations for: " + $en) }
    $strings[$en] = $tr
  }
  $pats = [ordered]@{}
  foreach ($p in $patterns) { if ($p[0] -and $p[$L.col]) { $pats[[string]$p[0]] = [string]$p[$L.col] } }
  $file = [ordered]@{
    meta = [ordered]@{ lang = $L.code; name = $L.name; reviewed = $reviewed; note = 'Built by tools/build-i18n.ps1 from i18n/source. Edit the source files, not this one.' }
    strings = $strings
    patterns = $pats
  }
  [IO.File]::WriteAllText($out, ($file | ConvertTo-Json -Depth 5), $utf8)
  Write-Output ($L.code + ': ' + $strings.Count + ' strings, ' + $pats.Count + ' patterns')
}
