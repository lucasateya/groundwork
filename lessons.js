// Groundwork — Interview skill path curriculum.
//
// Edit lesson wording here; index.html reads INTERVIEW_LESSONS from this file.
// Each lesson has two kinds of fields:
//
// Shown to the learner
//   tier, title, summary  - path label, lesson name, one-line popover blurb
//   intro                 - opening paragraphs (array of strings)
//   sections              - [{ heading, paragraphs?: [...], points?: [...] }]
//   example               - { question, weak, strong, why } side-by-side answers
//   setting, task         - the practice scene and what to do in it
//   weakHint, strongHint  - shown after the 1st / 2nd failed attempt
//   takeaway              - one line shown after passing
//
// Used only in AI prompts (never shown)
//   counterpart, counterpartRole - who the practice partner is
//   opening               - the partner's first line
//   partnerNotes          - how the partner should follow up
//   skill                 - plain description of the skill, for the partner and grader
//   criteria              - what 0 / 1 / 2 / 3 stars looks like
//
// Lesson ids are saved with the learner's stars, so don't reuse an old id for
// a different lesson. Use backticks for text so apostrophes and quotes are safe.

const INTERVIEW_LESSONS = [

  // ───────────────────────── BEGINNER ─────────────────────────

  { id:'int-first-impression', tier:'Beginner', title:'The first two minutes',
    summary:`Small talk, saying hello, and settling your nerves.`,
    intro:[
      `Most people think an interview starts with the first real question. It doesn't. It starts the moment someone walks over and says hi, and those first couple of minutes of small talk shape how everything after them lands.`,
      `The good news: this is the easiest part to practice, and you don't need any experience to be good at it.`
    ],
    sections:[
      { heading:`Why it matters`,
        paragraphs:[
          `Interviewers are people, and people form impressions fast. If the first minute feels easy and warm, the interviewer relaxes and starts listening for reasons to like you. If it feels stiff, they have to work harder to see who you really are.`,
          `Nobody expects you to be smooth. They're checking simple things. Are you friendly? Are you paying attention? Would it be nice to work a shift next to you?`
        ] },
      { heading:`How to do it`,
        points:[
          `Smile, say hi, and use their name once you hear it: "Nice to meet you, Maria."`,
          `Answer small-talk questions in a sentence or two. Not one word, and not a speech.`,
          `Give something back: a thank-you, a comment about the place, or a light question like "Have you worked here long?" That's what turns it into a real conversation.`,
          `If you're nervous, it's fine to say so lightly: "I'm a little nervous, but I'm really glad to be here." Being honest works better than pretending.`
        ] },
      { heading:`Common traps`,
        points:[
          `One-word answers ("Yeah." "Fine."). They come across as uninterested, even when you're just nervous.`,
          `Opening with a complaint about the bus, the traffic, or how tired you are.`,
          `Launching into your rehearsed answers before they've asked a single real question.`
        ] }
    ],
    example:{
      question:`Hey, thanks for coming in! Did you find the place okay?`,
      weak:`Yeah.`,
      strong:`I did, thanks! I actually walk past here on my way to school, so it was easy. Thanks for making time to meet with me.`,
      why:`Both answers say the same thing. The second one gives them something to respond to and ends with appreciation. It takes ten seconds, and it changes the whole tone.`
    },
    setting:`You're arriving for an interview for a part-time cashier job at Bloom Pet Supply, a neighborhood pet store.`,
    task:`Maria, the store manager, is coming over to greet you. Handle the small talk like a real person would: warm, brief, and giving something back.`,
    takeaway:`Answer in a sentence, be warm, and give something back. That's most of a good first impression.`,
    weakHint:`Answer in a full sentence instead of one word, and hand something back to Maria, like a thank-you or a small question.`,
    strongHint:`Try something like: "I did, thanks! It was an easy walk. Thanks for having me in. Do you have any pets yourself?"`,
    counterpart:'Maria',
    counterpartRole:`the store manager at Bloom Pet Supply, a neighborhood pet store, about to interview the candidate for a part-time cashier job`,
    opening:`Hey, you must be here for the interview! I'm Maria. Did you find the place okay?`,
    partnerNotes:`This is the small talk before the formal interview, as you walk them to the back office. React naturally to what they said and make one more light small-talk comment or question (their day, the weather, whether they have pets). Do not start formal interview questions yet.`,
    skill:`Opening small talk in the first minute of an interview: responding warmly in a sentence or two instead of one word, showing appreciation, and giving something back (a comment or question) so it feels like a real conversation, without complaining or launching into a rehearsed pitch.`,
    criteria:`0 stars: rude, one-word, off-topic, or opens with complaints. 1 star: polite but minimal (short, flat answers with nothing given back), or long and rehearsed-sounding. 2 stars: friendly, natural answers of about the right length with at least one moment of warmth or appreciation. 3 stars: warm and natural throughout, answers in a sentence or two, shows appreciation, and gives something back that keeps the conversation going.`
  },

  { id:'int-about-yourself', tier:'Beginner', title:'Tell me about yourself',
    summary:`The question almost every interview starts with.`,
    intro:[
      `"So, tell me about yourself." It sounds like the easiest question in the world, and it's the one people freeze on most. Where do you even start?`,
      `Here's the secret: they aren't asking for your life story. They're asking, "Give me a quick picture of who you are, and why you're sitting here."`
    ],
    sections:[
      { heading:`Why they ask it`,
        paragraphs:[
          `It's a warm-up, but it's also a quiet test. From your answer, they learn what you think is important, how clearly you talk, and whether you've thought about this job at all.`,
          `It also sets the direction for the rest of the interview. Whatever you mention here is what they'll probably ask about next, so choose details you'd be happy to talk more about.`
        ] },
      { heading:`A simple shape: now, before, next`,
        points:[
          `Now: what you're doing these days. "I'm a junior at Westview High," or "I've been working at a daycare for the past year."`,
          `Before: one or two things you've done that connect to this job. A skill, an activity, a responsibility.`,
          `Next: why this job is the step you want. This is the part people forget, and it's the most important.`,
          `Aim for 30 to 60 seconds out loud, which is about 60 to 120 words.`
        ] },
      { heading:`What to leave out`,
        paragraphs:[
          `Your age, your family, where you grew up, your favorite show: skip them unless they actually connect to the job. It's not that they're secret. They just crowd out the things that help you.`
        ] }
    ],
    example:{
      question:`So, tell me about yourself.`,
      weak:`Um, well, I'm 17, I have two brothers and a dog, I like video games and hanging out with my friends, and I guess I want a job because I'm saving up for a car.`,
      strong:`Sure! I'm a junior at Westview High, and outside of school I help run the snack stand at our basketball games, so I'm used to handling money and staying friendly when there's a long line. I'm looking for my first real job, and a grocery store feels like a good fit because I like being busy and around people.`,
      why:`The first answer isn't wrong. It's just a list. The second one picks details that matter for this job and ends with why they're here.`
    },
    setting:`You're interviewing for a part-time job bagging and stocking at Fresh Fields, a local grocery store.`,
    task:`Jordan, the assistant manager, is starting the interview. Give your now, before, next answer, and then handle whatever follow-up comes.`,
    takeaway:`Now, before, next. Pick details that fit the job, and always end with why you're here.`,
    weakHint:`Try three parts: what you're doing now, one thing you've done that fits this job, and why you want this job next.`,
    strongHint:`Shape it like: "I'm a ___ at ___. I've been ___, so I'm used to ___. I'm looking for ___, and this job fits because ___."`,
    counterpart:'Jordan',
    counterpartRole:`the assistant manager at Fresh Fields, a local grocery store, interviewing the candidate for a part-time bagging and stocking job`,
    opening:`Thanks for coming in. I'm Jordan, I'll be running the interview today. Let's start easy: tell me a little about yourself.`,
    partnerNotes:`After their answer, ask one natural follow-up that builds on something specific they mentioned (for example, "What do you like most about that?" or "Tell me more about..."), so they get a second chance to stay focused and relevant.`,
    skill:`Answering "tell me about yourself" with a short, focused snapshot: what they're doing now, one or two relevant things they've done, and why this job is the next step, in roughly 60-120 words, without a list of unrelated personal facts.`,
    criteria:`0 stars: off-topic, one-word, or only unrelated personal facts. 1 star: some relevant information but no clear shape, rambles well past 150 words, or never connects to the job. 2 stars: a clear, reasonably brief answer that covers what they do now and ties to wanting the job, even if one part is thin. 3 stars: a confident, well-shaped answer (now, before, next) of roughly 60-120 words with a specific, relevant detail and a clear reason for wanting this job, and a follow-up answer that stays on point.`
  },

  { id:'int-answer-first', tier:'Beginner', title:'Answer first, then prove it',
    summary:`Stop rambling. Lead with the answer and back it up.`,
    intro:[
      `You know the feeling. Someone asks you a question, your brain panics, and your mouth keeps going while you wait for a good answer to show up. By the time you finish, neither of you remembers the question.`,
      `This lesson is about the one habit that fixes most of that.`
    ],
    sections:[
      { heading:`Why rambling happens`,
        paragraphs:[
          `Nerves make silence feel scary, so we fill it. We also worry that a short answer sounds lazy. So we pile on, hoping something lands.`,
          `The interviewer doesn't hear "thorough." They hear someone who isn't sure what they think. Your best point gets buried under everything around it.`
        ] },
      { heading:`The fix: headline, proof, stop`,
        points:[
          `Headline: answer the question in your very first sentence. "My biggest strength is that I'm reliable."`,
          `Proof: one specific detail that shows it's true. "I volunteered every Saturday at 7 a.m. for six months and didn't miss one."`,
          `Stop. Seriously. If they want more, they'll ask, and a follow-up question means they're interested.`
        ] },
      { heading:`It's okay to pause`,
        paragraphs:[
          `Taking a second to think is completely normal. "Good question, let me think for a second" sounds calm and confident. A three-second pause feels endless to you. To the interviewer it barely registers.`
        ] }
    ],
    example:{
      question:`What's one strength you'd bring to this job?`,
      weak:`Hmm, that's a hard one. I guess I'm, like, a people person? I don't know, I get along with most people, I've never really had problems with anyone, my friends say I'm easy to talk to, and I think that's important, so yeah, probably that.`,
      strong:`I'm really reliable. Last year I volunteered at the food bank every Saturday at 7 a.m., and I didn't miss a single shift in six months.`,
      why:`The strong answer is shorter and more convincing. It leads with the point and then proves it with one real detail.`
    },
    setting:`You're interviewing for a front desk job at the Riverside Community Center, checking people in and answering questions.`,
    task:`Andre, the program coordinator, is going to ask you a couple of direct questions. Use headline, proof, stop for each one.`,
    takeaway:`Headline, proof, stop. Your first sentence should answer the question.`,
    weakHint:`Put your actual answer in your very first sentence, add one detail that proves it, and then stop talking.`,
    strongHint:`Use this shape: "My strength is ___. For example, ___." That's the whole answer. Two or three sentences.`,
    counterpart:'Andre',
    counterpartRole:`the program coordinator at the Riverside Community Center, interviewing the candidate for a front desk job`,
    opening:`Alright, let's jump in. What's one strength you'd bring to this job?`,
    partnerNotes:`After their answer, react briefly and ask a second direct question, such as "And what kind of environment do you do your best work in?" or "What would your friends say you're not so great at?", so they can practice answering first again.`,
    skill:`Giving concise, focused answers: stating the answer in the first sentence, supporting it with one specific detail, and stopping instead of rambling or burying the point.`,
    criteria:`0 stars: doesn't answer the questions asked. 1 star: answers eventually, but the point is buried, vague, or runs long (roughly over 100 words) with filler. 2 stars: states the answer early and stays mostly on point, though the supporting detail may be generic. 3 stars: both answers lead with a direct answer in the first sentence, back it with one concrete detail, and stay under about 60 words each.`
  },

  { id:'int-why-this-job', tier:'Beginner', title:'Why this job?',
    summary:`Show you want this job, not just any job.`,
    intro:[
      `"Why do you want to work here?" There's an honest answer in most people's heads: "Because I need money, and you were hiring." That's fine. It's true for almost everyone.`,
      `But it's not what gets you hired, because it's true of every job. This lesson is about finding the answer that's only true about this one.`
    ],
    sections:[
      { heading:`What they're really asking`,
        paragraphs:[
          `Hiring and training someone takes time. The interviewer wants to know: will this person actually care about the work, and will they stick around? Someone who picked this job on purpose is a safer bet than someone who applied to twenty places without reading any of them.`
        ] },
      { heading:`Do ten minutes of homework`,
        points:[
          `Look at their website or social media. What do they sell, who are their customers, what do they seem proud of?`,
          `If it's a store or restaurant, walk through it before the interview. Notice what it's like to be a customer there.`,
          `Read the job posting twice. Find one or two parts of the actual work that you'd genuinely enjoy.`
        ] },
      { heading:`Connect their thing to your thing`,
        paragraphs:[
          `The strongest answers have two halves: something specific about this job or place, and why it fits you. "You do a lot of outdoor activities" plus "I grew up hiking with my family" is a real reason. It's personal, it's specific, and it's hard to fake.`,
          `You can still be honest about needing the money. Just don't let it be the whole answer.`
        ] }
    ],
    example:{
      question:`So what made you apply to be a counselor here?`,
      weak:`Honestly, I just need a summer job and this one was hiring.`,
      strong:`I've watched my little cousins a lot, and I actually like the chaos of keeping a group of kids busy. I saw on your website that you do a lot of hiking and canoeing, and I grew up doing that with my family, so it felt like a real fit. And honestly, spending my summer outside beats a lot of other jobs.`,
      why:`The strong answer is still honest, and it even jokes about wanting to be outside. But it shows they looked at this camp specifically and have a real reason to be good at it.`
    },
    setting:`You're interviewing for a summer job as a counselor at Pine Hollow Day Camp, an outdoor day camp for kids ages 6 to 12.`,
    task:`Sam, the camp director, wants to know why you applied. Connect something specific about this camp to something real about you.`,
    takeaway:`Find the reason that's only true about this job, and connect it to something real about you.`,
    weakHint:`Name one specific thing about this camp or this kind of work that you actually like, and tie it to something about you.`,
    strongHint:`Try: "I applied because ___ (something specific about the camp or job), and that fits me because ___ (your experience, interest, or goal)."`,
    counterpart:'Sam',
    counterpartRole:`the director of Pine Hollow Day Camp, an outdoor day camp for kids ages 6 to 12 that does hiking, canoeing, and crafts, interviewing the candidate for a summer counselor job`,
    opening:`Great to meet you. So, what made you want to be a counselor here at Pine Hollow?`,
    partnerNotes:`After their answer, ask one follow-up that tests whether they've really thought about the job, such as "What do you think will be the hardest part of this job?" or "What do you know about how our days here work?"`,
    skill:`Answering "why do you want this job" by connecting specific details of this job or organization to the candidate's own interests, experience, or goals, instead of generic reasons (money, location, "it seems fun") that could apply to any job.`,
    criteria:`0 stars: no reason given, or only reasons that could apply to any job (money, location, schedule) with nothing else. 1 star: some interest shown, but it stays generic ("it seems fun", "I like kids") with nothing specific to this job. 2 stars: names at least one specific aspect of this job or camp and links it to themselves. 3 stars: a genuine answer that connects specific details of this job to the candidate's own interests or experience, and a thoughtful follow-up answer that shows they've pictured actually doing the work.`
  },

  // ─────────────────────── INTERMEDIATE ───────────────────────

  { id:'int-real-story', tier:'Intermediate', title:'Tell a real story',
    summary:`Prove what you say with a short story, using STAR.`,
    intro:[
      `Anyone can say "I'm a hard worker" or "I'm great under pressure." Interviewers hear it all day, and it goes in one ear and out the other.`,
      `A story is different. A short, real story about something you actually did sticks in their memory and proves your point without you having to claim it.`
    ],
    sections:[
      { heading:`Why stories beat claims`,
        paragraphs:[
          `When an interviewer says "Tell me about a time when...", they're using a simple idea: the best way to predict what you'll do is to look at what you've already done. A description of what you'd "usually" do doesn't answer that. A real moment does.`
        ] },
      { heading:`The STAR shape`,
        points:[
          `Situation: set the scene in one sentence. Where were you, what was going on?`,
          `Task: what needed to happen, and what was your part?`,
          `Action: what did you do? This should be the biggest part of the story.`,
          `Result: how did it turn out? A number, a reaction, or what you learned all count.`
        ] },
      { heading:`Say "I," not "we"`,
        paragraphs:[
          `In group stories it's natural to say "we did this, we did that." But the interviewer isn't hiring your group. Give credit where it's due, and make sure it's clear what you personally did.`
        ] },
      { heading:`Build a story bank`,
        paragraphs:[
          `Before any interview, think of three or four stories you could tell. Good places to look: school projects, sports teams, clubs, babysitting, family responsibilities, volunteering, or side jobs like mowing lawns. One story can often answer several different questions.`
        ] }
    ],
    example:{
      question:`Tell me about a time you had to deal with a difficult situation.`,
      weak:`I'm pretty good with difficult situations. I stay calm and try to find a solution, and I always make sure everyone's happy in the end.`,
      strong:`Last spring I was in a group project, and two days before it was due, one person just stopped answering messages. Someone had to cover their slides. I messaged them one more time, then split their section with another teammate and stayed late at the library to finish it. We turned it in on time and got a B+, and now I set check-in dates at the start of every group project.`,
      why:`The first answer is all claims. The second one is a real moment with a clear situation, task, action, and result, plus a lesson learned. It proves the same point without ever saying "I'm good under pressure."`
    },
    setting:`You're interviewing for a server job at Lou's Diner, a busy breakfast spot downtown.`,
    task:`Lou, the owner, is going to ask for a real story. Tell one using STAR, and be ready for a question about it.`,
    takeaway:`One real story beats ten claims. Situation, task, action, result, and make the action about you.`,
    weakHint:`Pick one specific moment instead of "I usually...". What happened, what did you do, and how did it end?`,
    strongHint:`Walk through it in order: "We were ___. I needed to ___. So I ___. In the end, ___." Make the middle part about what you did.`,
    counterpart:'Lou',
    counterpartRole:`the owner of Lou's Diner, a busy downtown breakfast spot, interviewing the candidate for a server job`,
    opening:`I like to hear real stories, not rehearsed answers. So tell me about a time you had to deal with a difficult situation, at school, work, anywhere.`,
    partnerNotes:`After their story, ask a follow-up that digs into it, such as "What would you do differently if it happened again?" or "How did the other people involved react?" If they gave a general answer instead of a story, gently ask for a specific example.`,
    skill:`Answering behavioral questions with a specific real story using STAR (situation, task, action, result), with the candidate's own actions front and center, instead of general claims about themselves.`,
    criteria:`0 stars: no example at all, or a refusal. 1 star: speaks in generalities ("I always...", "I'm the kind of person who...") or the story has no clear action or result. 2 stars: a real, specific example with a recognizable situation, action, and result, even if one part is thin or they say "we" more than "I". 3 stars: a concise, specific story that clearly covers situation, task, action, and result, with the candidate's own actions front and center and a concrete outcome, and a thoughtful follow-up answer.`
  },

  { id:'int-no-experience', tier:'Intermediate', title:`"I don't have experience"`,
    summary:`Your life counts as experience. Here's how to use it.`,
    intro:[
      `If you're going for your first job, there's a question you're probably dreading: "What experience do you have?" It can feel like the honest answer is "none."`,
      `It almost never is. You have more experience than you think. You just haven't learned to translate it yet.`
    ],
    sections:[
      { heading:`You have more than you think`,
        paragraphs:[
          `"Experience" doesn't only mean a paycheck. Watching younger siblings, cooking for your family, captaining a team, keeping up grades while working a side gig, helping at your place of worship, running a small online shop, fixing friends' computers: all of it shows skills employers want.`
        ] },
      { heading:`Translate it into job language`,
        points:[
          `Babysitting or caring for family: responsibility, trust, staying calm when things go wrong.`,
          `Team sports or band: showing up on time, taking feedback, working with people you didn't choose.`,
          `School projects: deadlines, teamwork, sorting out who does what.`,
          `Side hustles (lawns, pet sitting, reselling): handling money, customers, and your own schedule.`
        ] },
      { heading:`Never apologize for it`,
        paragraphs:[
          `The weakest way to start is "I don't really have any experience, but..." It tells them to picture nothing. Lead with what you have: "This would be my first paid job, but I've been doing ___ for two years."`,
          `Employers hiring for entry-level jobs expect beginners. What they're looking for is someone who's responsible and ready to learn.`
        ] }
    ],
    example:{
      question:`Most people we hire have some work experience. What have you done that would prepare you for this?`,
      weak:`I don't really have any experience, sorry. This would be my first job.`,
      strong:`This would be my first paid job, but for two years I've picked up my little brother from school and made dinner three days a week. So I'm used to being on time, handling things on my own, and dealing with a very picky customer.`,
      why:`Same person, same background. The strong answer turns everyday life into proof of reliability, and the small joke at the end makes them memorable.`
    },
    setting:`You're interviewing for your first job, working concessions and cleaning theaters at Starlite Cinemas.`,
    task:`Chris, the shift lead, is going to ask what you've done that prepares you. Pick something real from your life and translate it.`,
    takeaway:`You don't have "no experience." You have experience you haven't translated yet.`,
    weakHint:`Think outside of jobs: family, school, sports, hobbies, helping people. What have you been responsible for?`,
    strongHint:`Try: "This would be my first paid job, but I've been ___ for ___, so I'm used to ___." Then give one detail.`,
    counterpart:'Chris',
    counterpartRole:`a shift lead at Starlite Cinemas, a movie theater, interviewing the candidate for an entry-level concessions and cleaning job`,
    opening:`So, most of the people we hire have had a job before. Tell me what you've done that would prepare you for working here.`,
    partnerNotes:`After their answer, pick one thing they mentioned and ask how it would help them here, such as "How do you think that would help you on a busy Friday night?" If they said they have no experience, gently ask, "Nothing at all? What about school, family, or activities?"`,
    skill:`Presenting non-work experience (school, family responsibilities, sports, hobbies, volunteering, side gigs) as real, relevant experience by translating it into job skills, without apologizing for not having had a job before.`,
    criteria:`0 stars: says they have nothing, or apologizes and stops. 1 star: mentions something from their life but doesn't connect it to the job, or opens by apologizing for lacking experience. 2 stars: names a specific non-work experience and connects it to at least one skill useful for this job. 3 stars: confidently leads with a specific experience, clearly translates it into skills that matter for this job, and connects it concretely to the work when asked the follow-up.`
  },

  { id:'int-working-with-people', tier:'Intermediate', title:'Working with other people',
    summary:`Talk about teamwork and disagreements like an adult.`,
    intro:[
      `Almost every job means working with people you didn't choose: coworkers, managers, customers. So interviewers love questions like "Tell me about a time you disagreed with someone."`,
      `It can feel like a trick question. It isn't, but there are a few ways to answer it badly.`
    ],
    sections:[
      { heading:`What they're really checking`,
        paragraphs:[
          `They're not hoping to hear that you've never disagreed with anyone. Nobody believes that. They want to know that when you do, you handle it calmly, listen to the other side, and keep working together afterward.`
        ] },
      { heading:`A good story looks like this`,
        points:[
          `A real but small disagreement. A project idea, a schedule, how to split the work. Not a huge personal fight.`,
          `You took the other person seriously, and you asked or listened before you pushed back.`,
          `You found a way forward: a compromise, a test, or asking someone else to decide.`,
          `The relationship came out okay, or even better.`
        ] },
      { heading:`What to avoid`,
        points:[
          `"I've never really had a conflict." It sounds like you're hiding something, or haven't thought about it.`,
          `Making the other person the villain. Even if they were wrong, trashing them makes you look bad.`,
          `A story where you were 100% right and they eventually admitted it. Real disagreements are messier than that, and interviewers know it.`
        ] }
    ],
    example:{
      question:`Tell me about a time you disagreed with someone you were working with.`,
      weak:`I don't really have conflicts. I get along with pretty much everyone.`,
      strong:`On my robotics team, another member wanted to rebuild our whole robot arm a week before competition. I thought it was too risky, but instead of arguing in front of everyone, I asked him to walk me through his idea after practice. He had a good point about the gripper, so we rebuilt just that part. It worked, and we're actually good friends now.`,
      why:`The strong answer shows a real disagreement, respect for the other person, a practical compromise, and a good ending. That's exactly what they're hoping to hear.`
    },
    setting:`You're interviewing for a barista job at Common Grounds Coffee, a busy café where the team works shoulder to shoulder.`,
    task:`Taylor, the shift supervisor, is going to ask about a disagreement. Tell a real story that shows you listen and work things out.`,
    takeaway:`Disagreements are normal. Show that you listen, respect the other person, and find a way forward.`,
    weakHint:`Pick a real but small disagreement, and focus on how you listened and what you did to work it out.`,
    strongHint:`Try: "I disagreed with ___ about ___. Instead of ___, I ___. We ended up ___, and it worked out because ___."`,
    counterpart:'Taylor',
    counterpartRole:`the shift supervisor at Common Grounds Coffee, a busy café where the team works in a small space, interviewing the candidate for a barista job`,
    opening:`We work in a pretty tight space back there, so teamwork matters a lot. Tell me about a time you disagreed with someone you were working with. How did you handle it?`,
    partnerNotes:`After their answer, ask a follow-up about what they learned or would do differently, such as "What did that teach you about working with people?" or "What would you do if a coworker here kept doing something that bugged you?" If they claim they never have conflicts, gently push for a real example.`,
    skill:`Describing a real disagreement with a teammate or coworker in a mature way: taking the other person seriously, listening, finding a way forward, and staying respectful, without claiming to never have conflict or blaming the other person.`,
    criteria:`0 stars: refuses, claims to never have conflicts, or describes behaving badly with no reflection. 1 star: a real example, but it blames or belittles the other person, or shows no listening or resolution. 2 stars: a real disagreement handled respectfully with some kind of resolution. 3 stars: a specific, believable story showing they listened, respected the other person, and reached a practical resolution, plus a thoughtful follow-up about what they learned or would do.`
  },

  { id:'int-what-would-you-do', tier:'Intermediate', title:'"What would you do if...?"',
    summary:`Think out loud through situations you haven't faced yet.`,
    intro:[
      `Some questions aren't about your past at all. They drop you into a made-up situation: "A customer is yelling at you. What do you do?"`,
      `You can't have a story ready for every scenario, and that's the point. They want to see how you think on your feet.`
    ],
    sections:[
      { heading:`What they're testing`,
        paragraphs:[
          `Judgment. Do you stay calm? Do you care about the customer and the business at the same time? Do you know when something is above your pay grade? There's rarely one "right" answer, but some answers are clearly more thoughtful than others.`
        ] },
      { heading:`A simple approach`,
        points:[
          `Stay calm and acknowledge the person: "I'd tell them I'm sorry about the trouble and that I want to help."`,
          `Get the facts before acting: look at the receipt, ask a question, check the system.`,
          `Fix what you're allowed to fix.`,
          `Get help when you should. Knowing when to call a manager is a strength, not a weakness.`
        ] },
      { heading:`Thinking out loud is fine`,
        paragraphs:[
          `You can talk through it step by step: "My first move would be... then, depending on what I found, I'd..." It shows your thinking, which is exactly what they want to see. Just make sure you land on a clear plan.`
        ] }
    ],
    example:{
      question:`A customer comes up to your register upset, saying they were overcharged, and they're getting loud. What do you do?`,
      weak:`I'd just give them their money back so they calm down.`,
      strong:`First I'd stay calm, tell them I'm sorry about the trouble, and say I want to fix it. Then I'd ask to see their receipt and check it against the shelf price. If we overcharged them, I'd fix it right there. If it's something I'm not allowed to do, like a big refund, I'd call a manager up front right away instead of leaving them waiting.`,
      why:`The weak answer skips straight to giving money away without checking anything. The strong one is calm, gets the facts, and knows its limits.`
    },
    setting:`You're interviewing for a cashier job at Hilltop Hardware, a family-owned hardware store.`,
    task:`Rosa, the front-end manager, is going to put you in a tricky situation. Walk through what you'd do, step by step.`,
    takeaway:`Stay calm, get the facts, fix what you can, and get help when you should.`,
    weakHint:`Slow down. Before fixing anything, what would you say to the customer, and what would you check first?`,
    strongHint:`Try walking through it: "First I'd ___. Then I'd check ___. If ___, I'd ___. If it's more than I'm allowed to handle, I'd ___."`,
    counterpart:'Rosa',
    counterpartRole:`the front-end manager at Hilltop Hardware, a family-owned hardware store, interviewing the candidate for a cashier job`,
    opening:`Let me give you a situation. A customer comes up to your register really upset. They say they were overcharged, and they're starting to get loud. You're the only one at the front. What do you do?`,
    partnerNotes:`After their answer, add a realistic twist and ask what they'd do now, for example: "Okay, and say you check the receipt and they actually weren't overcharged. They're still upset. Then what?"`,
    skill:`Answering hypothetical situational questions with sound judgment: staying calm, acknowledging the person, getting the facts before acting, solving what they're allowed to solve, and escalating appropriately, laid out as a clear step-by-step plan.`,
    criteria:`0 stars: no real answer, or an inappropriate response (arguing, ignoring the customer, walking away). 1 star: a single quick fix with no checking or judgment (for example, just refunding immediately), or vague ("I'd handle it"). 2 stars: a reasonable plan that includes staying calm and at least one of checking facts or escalating appropriately. 3 stars: a clear, calm step-by-step plan (acknowledge, check facts, fix, escalate when needed) and a thoughtful adjustment when the situation changes in the follow-up.`
  },

  // ───────────────────────── ADVANCED ─────────────────────────

  { id:'int-weakness', tier:'Advanced', title:'The weakness question',
    summary:`Be honest about a weakness without hurting yourself.`,
    intro:[
      `"What's your biggest weakness?" It feels like a trap: be too honest and you're out, dodge it and you sound fake.`,
      `It's actually one of the best chances in the interview to show maturity, if you know how to use it.`
    ],
    sections:[
      { heading:`Why it isn't really a trap`,
        paragraphs:[
          `Everyone has weaknesses, and the interviewer knows it. What they're checking is self-awareness: do you know yourself well enough to name something real, and do you do anything about it? A person who's working on a weakness is more hireable than one who pretends not to have any.`
        ] },
      { heading:`Pick one that's real but not a dealbreaker`,
        paragraphs:[
          `Choose something true that isn't central to this job. If you're applying to be an office assistant, "I'm disorganized" is a problem. "I get nervous speaking up in big groups" usually isn't.`
        ] },
      { heading:`The shape: name it, show it, fix it`,
        points:[
          `Name it in one sentence.`,
          `Show it with a quick, real example of when it came up.`,
          `Fix it: what you're actively doing to get better. Spend most of your answer here, and end on it.`
        ] },
      { heading:`Skip the clichés`,
        paragraphs:[
          `"I'm a perfectionist." "I work too hard." "I care too much." Interviewers have heard these thousands of times, and they sound like dodges. A real weakness with a real plan will always beat them.`
        ] }
    ],
    example:{
      question:`What would you say is your biggest weakness?`,
      weak:`I'm a perfectionist. I just care too much about doing things right.`,
      strong:`I used to have a hard time speaking up when I didn't understand something. I'd just nod and try to figure it out later, which once meant I did an entire chemistry lab wrong. So now I make myself ask at least one question whenever I'm unsure, even if it feels awkward. It's gotten a lot easier, and honestly my teachers seem to appreciate it.`,
      why:`The strong answer is honest and specific, and it spends most of its time on what they're doing to improve. It turns a weakness into proof of growth.`
    },
    setting:`You're interviewing for an office assistant job at Greenway Dental, answering phones and scheduling patients.`,
    task:`Nina, the office manager, is going to ask about your biggest weakness. Name it, show it, and spend most of your answer on how you're fixing it.`,
    takeaway:`Name a real weakness, show it briefly, and spend most of your answer on how you're improving.`,
    weakHint:`Pick something real that won't sink you for an office job, and spend most of your answer on what you're doing about it.`,
    strongHint:`Shape: "Something I'm working on is ___. For example, ___. To get better, I've started ___, and it's helping." Skip "perfectionist."`,
    counterpart:'Nina',
    counterpartRole:`the office manager at Greenway Dental, interviewing the candidate for an office assistant job answering phones and scheduling patients`,
    opening:`Everyone has something they're working on. What would you say is your biggest weakness?`,
    partnerNotes:`After their answer, ask a follow-up that tests whether it's real, such as "Can you tell me about a time that actually got in your way?" or "How do you know you're getting better at it?" If they gave a cliché like perfectionism, politely ask for something more specific.`,
    skill:`Answering the weakness question with self-awareness: naming a real weakness that isn't central to the job, giving a brief example, and describing concrete steps they're taking to improve, ending on the improvement rather than a cliché or a dodge.`,
    criteria:`0 stars: refuses, claims to have no weaknesses, or names something disqualifying for an office job with no plan. 1 star: a cliché fake weakness (perfectionism, working too hard, caring too much), or a real weakness with no mention of improvement. 2 stars: a real, reasonable weakness plus some effort to improve, even if vague. 3 stars: an honest, specific weakness that isn't central to the job, a brief real example, concrete steps they're taking, and a believable follow-up answer, ending on a confident note.`
  },

  { id:'int-awkward-questions', tier:'Advanced', title:'Awkward questions',
    summary:`Handle questions about quitting, gaps, or bad moments.`,
    intro:[
      `Sooner or later, an interviewer will ask about something you'd rather skip: a job you left quickly, a gap in your schedule, a bad grade, a time you got in trouble.`,
      `Your stomach drops. But these questions are much easier to handle than they feel, and handling them well can actually earn you trust.`
    ],
    sections:[
      { heading:`Why they ask`,
        paragraphs:[
          `They don't really care about the past. They care whether it will happen again at their job. So your answer needs to do two things: explain what happened honestly, and show why it won't be a problem here.`
        ] },
      { heading:`Honest, short, forward`,
        points:[
          `Honest: tell the truth. Lies about past jobs are easy to discover, and they end interviews.`,
          `Short: one or two sentences about what happened. No long backstory, no drama.`,
          `Forward: spend the rest on what you learned or why this situation is different.`
        ] },
      { heading:`Never trash anyone`,
        paragraphs:[
          `Even if your old manager really was terrible, don't say it. The interviewer will picture you saying the same thing about them one day. Talk about the situation, not the people: "the schedule didn't work" instead of "my boss was awful."`
        ] }
    ],
    example:{
      question:`I see you were only at your last job for about three months. What happened there?`,
      weak:`Honestly, the manager there was terrible. She was always on my case about everything, and the schedule was a mess, so I just quit.`,
      strong:`It was a fast-food job, and the shifts kept running past midnight on school nights, which was hurting my grades. I talked to my manager about it, but they couldn't change it, so I gave two weeks' notice and left on good terms. That's actually part of why this job appeals to me: your weekend hours work much better with school.`,
      why:`The strong answer is honest and short, blames no one, shows they handled leaving responsibly, and turns straight back to why this job is a good fit.`
    },
    setting:`You're interviewing for a stock associate job at Maple & Main, a department store. For this practice, pretend you left your last job after only three months. Make up a realistic reason if you need to.`,
    task:`Ellis, the hiring manager, has noticed the short job on your application. Be honest, keep it short, and move forward.`,
    takeaway:`Honest, short, forward, and never trash anyone.`,
    weakHint:`Keep the "what happened" part to one or two calm sentences without blaming anyone, then talk about why it won't be an issue here.`,
    strongHint:`Try: "It was ___, and ___ wasn't working because ___. I ___ (how you left responsibly). That's part of why this job fits: ___."`,
    counterpart:'Ellis',
    counterpartRole:`the hiring manager at Maple & Main, a department store, interviewing the candidate for a stock associate job. You've noticed on their application that they only worked at their last job for about three months`,
    opening:`I noticed on your application that you were only at your last job for about three months. What happened there?`,
    partnerNotes:`After their answer, ask a natural follow-up, such as "If I called them, what do you think they'd say about you?" or "What would make you want to stay at a job long-term?"`,
    skill:`Handling an awkward question about leaving a job quickly: explaining honestly and briefly without blaming or criticizing anyone, showing they left responsibly, and turning toward what they learned or why this job is a better fit.`,
    criteria:`0 stars: refuses to answer, gets defensive, or says something alarming (for example, being fired for something serious) with no reflection. 1 star: blames or criticizes a former manager or coworkers, or tells a long, dramatic story. 2 stars: an honest, calm explanation that doesn't blame anyone, even if it doesn't clearly move forward. 3 stars: short, honest, blame-free, shows they left responsibly, turns toward why this job is a good fit, and gives a confident, believable follow-up answer.`
  },

  { id:'int-pay-and-hours', tier:'Advanced', title:'Pay and availability',
    summary:`Talk about hours and money clearly and confidently.`,
    intro:[
      `Near the end of many interviews comes the practical part: "What's your availability?" and "What are you hoping to make?"`,
      `A lot of people get awkward here and say "whatever works for you." That feels polite, but it can leave you with a schedule you can't keep or less pay than you could have had.`
    ],
    sections:[
      { heading:`Talking about this isn't rude`,
        paragraphs:[
          `You're both trying to figure out whether this works. The employer needs to know when you can work, and you need to know what you'll earn. Being clear and specific here is professional, not pushy.`
        ] },
      { heading:`Availability: specific and honest`,
        points:[
          `Give real days and times: "Weekdays after 3:30, and all day Saturday."`,
          `Mention what you can't do, calmly: "Sundays don't work for me because of family commitments."`,
          `Don't overpromise to seem eager. Whatever you say, they'll schedule you on it.`
        ] },
      { heading:`Pay: know your number before you walk in`,
        points:[
          `Look up similar jobs near you before the interview so you know the normal range.`,
          `For many entry-level jobs, the starting pay is already set. It's still fine to ask, "What's the starting pay for this role?"`,
          `If they ask what you want, give a range based on your research, and stay open: "Something around ___ would be great, but I'd love to hear what you usually start people at."`
        ] }
    ],
    example:{
      question:`What kind of hours are you available, and what are you hoping to make?`,
      weak:`Um, I'm free whenever, and I'm fine with whatever you pay.`,
      strong:`I'm available weekday afternoons from 3:30 on, and all day Saturday. Sundays don't work for me because of family commitments. For pay, similar bakery jobs I've seen around here start at about $15 an hour, so something in that range would be great, but I'd love to hear what you usually start people at.`,
      why:`The strong answer is specific, honest about limits, shows they did some research, and still sounds friendly and flexible.`
    },
    setting:`You're interviewing for a part-time counter job at Sunny Side Bakery, a small neighborhood bakery. Use your real availability, or make up a realistic schedule.`,
    task:`Grace, the owner, is moving on to logistics. Be specific about your hours and clear about pay, without being pushy or vague.`,
    takeaway:`Be specific about your hours, know your pay range before you walk in, and stay friendly and open.`,
    weakHint:`Name actual days and times you can work, and say something concrete about pay instead of "whatever."`,
    strongHint:`Try: "I'm available ___ and ___. ___ doesn't work for me because ___. For pay, I've seen similar jobs start around ___, but I'd love to hear what you usually offer."`,
    counterpart:'Grace',
    counterpartRole:`the owner of Sunny Side Bakery, a small neighborhood bakery, interviewing the candidate for a part-time counter job`,
    opening:`Okay, let's talk logistics. What kind of hours are you available, and what are you hoping to make?`,
    partnerNotes:`After their answer, apply a little realistic pressure, for example: "We usually start people a bit lower than that. Would that still work for you?" or "We really need someone on Sunday mornings. Is there any flexibility there?" Stay friendly and reasonable.`,
    skill:`Discussing availability and pay clearly and professionally: giving specific days and times, being honest about limits without overpromising, naming a researched pay range or asking about starting pay, and staying calm and friendly under light pressure.`,
    criteria:`0 stars: refuses to answer, or is rude or demanding. 1 star: vague ("whenever", "whatever you pay") or overpromises, or caves on everything immediately under pressure. 2 stars: gives specific availability and addresses pay in some concrete way (a number, a range, or asking about starting pay). 3 stars: specific, honest availability with clear limits, a researched or reasonable pay range stated confidently but openly, and a calm, thoughtful response to the pressure in the follow-up (accepting, asking a question, or offering a reasonable compromise).`
  },

  { id:'int-closing-strong', tier:'Advanced', title:'Your questions and the goodbye',
    summary:`Ask good questions and leave a strong last impression.`,
    intro:[
      `"Well, that's all my questions. Do you have any questions for me?" This is where a lot of people relax, say "Nope, I'm good!", and walk out.`,
      `That's a missed chance. The end of an interview is what they'll remember most, and your questions show how much you actually care.`
    ],
    sections:[
      { heading:`Always have questions`,
        paragraphs:[
          `"No questions" can sound like you're not that interested, or you just want to leave. Have two or three ready. Even if some get answered during the interview, you'll have a backup.`
        ] },
      { heading:`Questions that work well`,
        points:[
          `"What does a typical shift look like?"`,
          `"What do the people who do really well in this job have in common?"`,
          `"What's the training like for new people?"`,
          `"What's the next step in the process?"`
        ] },
      { heading:`Questions to skip, for now`,
        points:[
          `Anything their website already answers. It shows you didn't look.`,
          `Leading with time off or breaks. Fair to ask later, but not as your first question.`,
          `"Did I get the job?" Ask about next steps instead.`
        ] },
      { heading:`The goodbye`,
        paragraphs:[
          `When it wraps up, say thank you and restate your interest in one sentence: "Thanks so much for your time. I'm really excited about this job and I hope I get the chance to work here." That's it, and it's what they'll remember.`
        ] }
    ],
    example:{
      question:`Well, that's all my questions. Do you have any questions for me?`,
      weak:`Nope, I think you covered everything!`,
      strong:`Yeah, actually. What does a typical afternoon shift look like? And what do your best library assistants do that makes them stand out?`,
      why:`Two short, real questions show they're picturing themselves doing the job and want to be good at it. That's the impression you want to leave.`
    },
    setting:`You're finishing an interview for a library assistant job at the Oak Street Public Library, shelving books and helping visitors.`,
    task:`Linh, the branch supervisor, is done asking questions. Ask good ones of your own, then close the interview with a strong goodbye.`,
    takeaway:`Always bring two or three real questions, and end with thanks and one sentence of genuine interest.`,
    weakHint:`Ask at least one real question about what the job is actually like, and when it wraps up, thank them and say you're interested.`,
    strongHint:`Try: "Yes! What does a typical shift look like?" Then, at the end: "Thanks so much for your time. I'm really excited about this job and hope I get to work here."`,
    counterpart:'Linh',
    counterpartRole:`the branch supervisor at the Oak Street Public Library, finishing an interview with the candidate for a library assistant job`,
    opening:`Well, that's all the questions I have for you. Do you have any questions for me?`,
    partnerNotes:`Answer their question warmly and briefly (2-3 sentences, realistic details about the library job), then start to wrap up by saying something like "Anything else before we finish up?", which gives them a chance to close strong. If they had no questions, respond politely and wrap up.`,
    skill:`Ending an interview well: asking thoughtful, genuine questions about the job (not "no questions", not things they could easily look up, not leading with time off), and closing with thanks and a clear statement of interest.`,
    criteria:`0 stars: no questions and no closing, or something inappropriate. 1 star: asks only about pay or time off, or a vague question, with no real closing. 2 stars: asks at least one genuine question about the job or next steps, or closes with clear thanks and interest. 3 stars: asks one or two thoughtful questions that show real interest in doing the job well, and closes with warm thanks and a clear, genuine statement of interest.`
  }
];
