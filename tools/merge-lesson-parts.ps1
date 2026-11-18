# Joins data/lessons/parts/<lang>-1.json, -2.json, ... into data/lessons/<lang>.json.
# Each part is a JSON object of { lessonId: { translated fields } }.
# Usage: powershell -ExecutionPolicy Bypass -File tools\merge-lesson-parts.ps1 es
param([Parameter(Mandatory = $true)][string]$Lang)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding $false
$parts = Get-ChildItem (Join-Path $root 'data\lessons\parts') -Filter ($Lang + '-*.json') | Sort-Object Name
if (-not $parts) { throw "No parts for $Lang" }
$bodies = foreach ($p in $parts) {
  $t = [IO.File]::ReadAllText($p.FullName, $utf8).Trim()
  $null = $t | ConvertFrom-Json  # fails loudly if a part isn't valid JSON
  $t.Substring(1, $t.Length - 2).Trim()
}
$out = "{`n  `"meta`": { `"lang`": `"$Lang`", `"reviewed`": false, `"note`": `"Draft translation of lessons.js (the fields learners see). Keys are lesson ids; English is the source.`" },`n  `"items`": {`n  " + ($bodies -join ",`n  ") + "`n  }`n}`n"
$null = $out | ConvertFrom-Json
[IO.File]::WriteAllText((Join-Path $root ('data\lessons\' + $Lang + '.json')), $out, $utf8)
$count = (($out | ConvertFrom-Json).items.PSObject.Properties | Measure-Object).Count
Write-Output "$Lang : $count lessons"
