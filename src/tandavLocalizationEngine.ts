export type SupportedLocale = 'en-IN' | 'hi-IN' | 'or-IN';

export interface LocalizedTextMap {
  'en-IN': string;
  'hi-IN': string;
  'or-IN': string;
}

export interface MoveLocalizationEntry {
  name: LocalizedTextMap;
  properties: LocalizedTextMap;
}

export interface TandavLocalizationSchema {
  GameConfiguration: {
    ProjectID: string;
    TargetEngine: string;
    SupportedLanguages: SupportedLocale[];
    DefaultFallback: SupportedLocale;
  };
  LocalizationMatrix: {
    Menus: Record<string, LocalizedTextMap>;
    UI_Buttons: Record<string, LocalizedTextMap>;
    Combat_Alerts: Record<string, LocalizedTextMap>;
    Engineering_Alerts: Record<string, LocalizedTextMap>;
    Fighters: Record<string, LocalizedTextMap>;
    Character_Moves: Record<string, MoveLocalizationEntry>;
  };
}

export const TANDAV_LOCALIZATION_MATRIX: TandavLocalizationSchema = {
  GameConfiguration: {
    ProjectID: 'Tandav_V1_2026',
    TargetEngine: 'Unreal_Engine_5',
    SupportedLanguages: ['en-IN', 'hi-IN', 'or-IN'],
    DefaultFallback: 'en-IN'
  },
  LocalizationMatrix: {
    Menus: {
      MainMenu_Title: {
        'en-IN': 'TĀṆḌAVA: THE RHYTHM OF WRATH',
        'hi-IN': 'तांडव: द रिदम ऑफ राथ',
        'or-IN': 'ତାଣ୍ଡବ: ଦ ରିଦମ ଅଫ୍ ର୍ରାଥ'
      },
      Mode_Story: {
        'en-IN': 'Mythic Campaign (Story Mode)',
        'hi-IN': 'पौराणिक अभियान (स्टोरी मोड)',
        'or-IN': 'ପୌରାଣିକ ଅଭିଯାନ (ଷ୍ଟୋରୀ ମୋଡ୍)'
      },
      Mode_Versus: {
        'en-IN': 'Versus Duel (1v1 Combat)',
        'hi-IN': 'द्वंद्व युद्ध (1v1 मुकाबला)',
        'or-IN': 'ଦ୍ୱନ୍ଦ୍ୱ ଯୁଦ୍ଧ (୧v୧ ମୁକାବିଲା)'
      },
      Mode_Practice: {
        'en-IN': 'Combat Practice (Gurukul Stance)',
        'hi-IN': 'युद्ध अभ्यास (गुरुकुल स्टांस)',
        'or-IN': 'ଯୁଦ୍ଧ ଅଭ୍ୟାସ (ଗୁରୁକୁଳ ଷ୍ଟାନ୍ସ)'
      },
      HUD_Subtitle: {
        'en-IN': '60 FPS Tāla Percussion Combat Engine • Mount Kailash Black Ice Sanctum',
        'hi-IN': '६० FPS ताल पर्कशन युद्ध इंजन • कैलाश पर्वत कृष्ण-हिम गर्भगृह',
        'or-IN': '୬୦ FPS ତାଳ ପର୍କସନ୍ ଯୁଦ୍ଧ ଇଞ୍ଜିନ୍ • କୈଳାସ ପର୍ବତ କୃଷ୍ଣ-ହିମ ଗର୍ଭଗୃହ'
      },
      Frame_Data: {
        'en-IN': 'Frame Data',
        'hi-IN': 'फ्रेम डेटा',
        'or-IN': 'ଫ୍ରେମ୍ ଡାଟା'
      },
      Fighters_Modes: {
        'en-IN': 'Fighters & Modes',
        'hi-IN': 'योद्धा और मोड',
        'or-IN': 'ଯୋଦ୍ଧା ଓ ମୋଡ୍'
      },
      Studio_APIs: {
        'en-IN': 'C++ / Studio APIs',
        'hi-IN': 'C++ / स्टूडियो API',
        'or-IN': 'C++ / ଷ୍ଟୁଡିଓ API'
      },
      Act_One_Cutscene: {
        'en-IN': 'Act I Cutscene',
        'hi-IN': 'अंक १ दृश्य',
        'or-IN': 'ଅଙ୍କ ୧ ଦୃଶ୍ୟ'
      }
    },
    UI_Buttons: {
      Select_Character: {
        'en-IN': 'Select Warrior',
        'hi-IN': 'योद्धा चयन करें',
        'or-IN': 'ଯୋଦ୍ଧା ଚୟନ କରନ୍ତୁ'
      },
      Stance_Switch: {
        'en-IN': 'Switch Tāṇḍava Stance',
        'hi-IN': 'तांडव मुद्रा बदलें (स्टांस स्विच)',
        'or-IN': 'ତାଣ୍ଡବ ମୁଦ୍ରା ବଦଳାନ୍ତୁ (ଷ୍ଟାନ୍ସ ସୁଇଚ୍)'
      },
      Confirm_Lock: {
        'en-IN': 'Ready for Battle',
        'hi-IN': 'युद्ध के लिए तैयार',
        'or-IN': 'ଯୁଦ୍ଧ ପାଇଁ ପ୍ରସ୍ତୁତ'
      },
      Execute_Moksha: {
        'en-IN': 'Moksha Finisher',
        'hi-IN': 'मोक्ष फिनिशर',
        'or-IN': 'ମୋକ୍ଷ ଫିନିସର୍'
      },
      Watch_Victory_Replay: {
        'en-IN': '5s Victory Replay',
        'hi-IN': '५s विजय रीप्ले',
        'or-IN': '୫s ବିଜୟ ରିପ୍ଲେ'
      },
      Nataraja_Parry: {
        'en-IN': 'Nataraja Parry',
        'hi-IN': 'नटराज डिफ्लेक्शन',
        'or-IN': 'ନଟରାଜ ଡିଫ୍ଲେକ୍ସନ୍'
      },
      Malla_Yudha_Grab: {
        'en-IN': 'Malla-Yudha Grab',
        'hi-IN': 'मल्ल-युद्ध पकड़',
        'or-IN': 'ମଲ୍ଲ-ଯୁଦ୍ଧ ଗ୍ରାବ୍'
      },
      Rakta_Bija_Clone: {
        'en-IN': 'Rakta-Bīja Clone',
        'hi-IN': 'रक्तबीज छाया क्लोन',
        'or-IN': 'ରକ୍ତବୀଜ ଛାୟା କ୍ଲୋନ୍'
      },
      Glacial_Fissure: {
        'en-IN': 'Glacial Fissure',
        'hi-IN': 'हिम दरार प्रहार',
        'or-IN': 'ହିମ ଫାଟ ପ୍ରହାର'
      },
      Round3_Avalanche: {
        'en-IN': 'R3 Avalanche',
        'hi-IN': 'राउंड ३ हिमस्खलन',
        'or-IN': 'ରାଉଣ୍ଡ ୩ ହିମସ୍ଖଳନ'
      },
      AI_Strike: {
        'en-IN': 'AI Strike',
        'hi-IN': 'AI प्रहार',
        'or-IN': 'AI ପ୍ରହାର'
      },
      Reset_Match: {
        'en-IN': 'Reset Match',
        'hi-IN': 'मैच रीसेट करें',
        'or-IN': 'ମ୍ୟାଚ୍ ରିସେଟ୍ କରନ୍ତୁ'
      },
      Frame_Data: {
        'en-IN': 'Frame Data',
        'hi-IN': 'फ्रेम डेटा',
        'or-IN': 'ଫ୍ରେମ୍ ଡାଟା'
      },
      Fighters_Modes: {
        'en-IN': 'Fighters & Modes',
        'hi-IN': 'योद्धा और मोड',
        'or-IN': 'ଯୋଦ୍ଧା ଓ ମୋଡ୍'
      },
      Studio_APIs: {
        'en-IN': 'C++ / Studio APIs',
        'hi-IN': 'C++ / स्टूडियो API',
        'or-IN': 'C++ / ଷ୍ଟୁଡିଓ API'
      },
      Act_One_Cutscene: {
        'en-IN': 'Act I Cutscene',
        'hi-IN': 'अंक १ दृश्य',
        'or-IN': 'ଅଙ୍କ ୧ ଦୃଶ୍ୟ'
      },
      Match_History: {
        'en-IN': 'Match History',
        'hi-IN': 'मैच इतिहास (लॉग)',
        'or-IN': 'ମ୍ୟାଚ୍ ଇତିହାସ (ଲଗ୍)'
      }
    },
    Combat_Alerts: {
      Round_Start: {
        'en-IN': 'ROUND 1: ARAMBHAM!',
        'hi-IN': 'राउंड १: आरम्भम!',
        'or-IN': 'ରାଉଣ୍ଡ ୧: ଆରମ୍ଭମ୍!'
      },
      Tala_Perfect: {
        'en-IN': 'COSMIC TĀLA! (PERFECT BEAT STRIKE • 1.5x DMG & +20% HITBOX)',
        'hi-IN': 'लौकिक ताल! (सटीक प्रहार • १.५x क्षति और +२०% हिटबॉक्स)',
        'or-IN': 'ମହାଜାଗତିକ ତାଳ! (ସଠିକ୍ ପ୍ରହାର • ୧.୫x କ୍ଷତି ଓ +୨୦% ହିଟବକ୍ସ)'
      },
      Tala_Great: {
        'en-IN': 'TĀLA GREAT! (SYNCED STRIKE • 1.2x DMG & +20% HITBOX)',
        'hi-IN': 'उत्तम ताल! (समकालिक प्रहार • १.२x क्षति)',
        'or-IN': 'ଉତ୍ତମ ତାଳ! (ସମକାଳୀନ ପ୍ରହାର • ୧.୨x କ୍ଷତି)'
      },
      Off_Beat: {
        'en-IN': 'OFF-BEAT INPUT • BASELINE FRAME DATA',
        'hi-IN': 'ताल से बाहर इनपुट • मानक फ्रेम डेटा',
        'or-IN': 'ତାଳ ବାହାରେ ଇନପୁଟ୍ • ମାନକ ଫ୍ରେମ୍ ଡାଟା'
      },
      Guard_Crush: {
        'en-IN': 'GUARD CRUSH! (50% BLOCK BYPASS & 12f STAGGER LOCK)',
        'hi-IN': 'रक्षा भंग! (स्टैगर लॉक • ५०% ब्लॉक बाईपास)',
        'or-IN': 'ରକ୍ଷା ଭଙ୍ଗ! (ଷ୍ଟାଗର୍ ଲକ୍ • ୫୦% ବ୍ଲକ୍ ବାଇପାସ୍)'
      },
      Pralaya_Active: {
        'en-IN': 'PRALAYA ACTIVE! (IMAX 1.43:1 TIME DILATION)',
        'hi-IN': 'प्रलय सक्रिय! (समय धीमा • IMAX 1.43:1)',
        'or-IN': 'ପ୍ରଳୟ ସକ୍ରିୟ! (ସମୟ ଧୀମା • IMAX 1.43:1)'
      },
      Moksha_Trigger: {
        'en-IN': 'MOKSHA FINISHER WINDOW ACTIVE!',
        'hi-IN': 'मोक्ष फिनिशर विंडो सक्रिय!',
        'or-IN': 'ମୋକ୍ଷ ଫିନିସର୍ ୱିଣ୍ଡୋ ସକ୍ରିୟ!'
      },
      Nataraja_Deflection: {
        'en-IN': 'NATARAJA DEFLECTION! 15f GLOBAL FREEZE • +18f STAGGER LOCK • 0 DMG',
        'hi-IN': 'नटराज डिफ्लेक्शन! १५ फ्रेम ग्लोबल फ्रीज • +१८ फ्रेम स्टैगर लॉक',
        'or-IN': 'ନଟରାଜ ଡିଫ୍ଲେକ୍ସନ୍! ୧୫ ଫ୍ରେମ୍ ଗ୍ଲୋବାଲ୍ ଫ୍ରିଜ୍ • +୧୮ ଫ୍ରେମ୍ ଷ୍ଟାଗର୍ ଲକ୍'
      },
      Malla_Yudha_Grab: {
        'en-IN': 'MALLA-YUDHA COMMAND GRAB! 65f SOCKET LOCK',
        'hi-IN': 'मल्ल-युद्ध कमांड पकड़! ६५ फ्रेम सॉकेट लॉक (अवरोध असंभव)',
        'or-IN': 'ମଲ୍ଲ-ଯୁଦ୍ଧ କମାଣ୍ଡ ଗ୍ରାବ୍! ୬୫ ଫ୍ରେମ୍ ସକେଟ୍ ଲକ୍ (ଅବରୋଧ ଅସମ୍ଭବ)'
      },
      Varma_Freeze: {
        'en-IN': 'VARMA KALAI PRĀṆA BIND — METER FROZEN FOR 4.0s',
        'hi-IN': 'वर्म कलै प्राण बंधन — तांडव गेज ४.० सेकंड के लिए स्थिर',
        'or-IN': 'ବର୍ମ କଳୈ ପ୍ରାଣ ବନ୍ଧନ — ତାଣ୍ଡବ ଗେଜ୍ ୪.୦ ସେକେଣ୍ଡ ପାଇଁ ସ୍ଥିର'
      },
      Rakta_Bija_Alert: {
        'en-IN': 'RAKTA-BĪJA REPLICATION! SHADOW CLONE SPAWNED (45f LEG-LOCK)',
        'hi-IN': 'रक्तबीज प्रतिकृति! छाया क्लोन उत्पन्न (४५ फ्रेम लेग-लॉक)',
        'or-IN': 'ରକ୍ତବୀଜ ପ୍ରତିକୃତି! ଛାୟା କ୍ଲୋନ୍ ଉତ୍ପନ୍ନ (୪୫ ଫ୍ରେମ୍ ଲେଗ୍-ଲକ୍)'
      },
      Glacial_Fissure_Alert: {
        'en-IN': 'GLACIAL FISSURE PLUNGE! MOUNT KAILASH BLACK ICE SHATTERED',
        'hi-IN': 'कैलाश हिम-दरार प्रहार! कृष्ण-हिम मंच खंडित',
        'or-IN': 'କୈଳାସ ହିମ-ଫାଟ ପ୍ରହାର! କୃଷ୍ଣ-ହିମ ମଞ୍ଚ ଖଣ୍ଡିତ'
      },
      Round3_Avalanche_Alert: {
        'en-IN': 'ROUND 3 — MOUNT KAILASH AVALANCHE SHOCKWAVE!',
        'hi-IN': 'राउंड ३ — कैलाश हिमस्खलन आघात तरंग! उच्च गुरुत्वाकर्षण सक्रिय',
        'or-IN': 'ରାଉଣ୍ଡ ୩ — କୈଳାସ ହିମସ୍ଖଳନ ଆଘାତ ତରଙ୍ଗ! ଉଚ୍ଚ ମାଧ୍ୟାକର୍ଷଣ ସକ୍ରିୟ'
      }
    },
    Engineering_Alerts: {
      Buffer_Overflow: {
        'en-IN': 'ERROR: Combo Input Buffer Limit Breached (12f Window Flushed)',
        'hi-IN': 'त्रुटि: कॉम्बो इनपुट बफर सीमा पार',
        'or-IN': 'ତ୍ରୁଟି: କମ୍ବୋ ଇନପୁଟ୍ ବଫର୍ ସୀମା ପାର୍'
      },
      Mocap_Sync_Error: {
        'en-IN': 'WARNING: Mo-Cap Camera Tracking Frame Drop Detected',
        'hi-IN': 'चेतावनी: मो-कैप कैमरा ट्रैकिंग फ्रेम ड्रॉप',
        'or-IN': 'ଚେତାବନୀ: ମୋ-କ୍ୟାପ୍ କ୍ୟାମେରା ଟ୍ରାକିଂ ଫ୍ରେମ୍ ଡ୍ରପ୍'
      },
      Api_Initialization_Fail: {
        'en-IN': 'CRITICAL ERROR: Studio Rendering API Handshake Failure',
        'hi-IN': 'गंभीर त्रुटि: स्टूडियो प्रतिपादन एपीआई विफलता',
        'or-IN': 'ଗମ୍ଭୀର ତ୍ରୁଟି: ଷ୍ଟୁଡିଓ ରେଣ୍ଡରିଂ API ବିଫଳତା'
      }
    },
    Fighters: {
      Bhairav_Name: {
        'en-IN': 'BHAIRAV',
        'hi-IN': 'भैरव',
        'or-IN': 'ଭୈରବ'
      },
      Bhairav_Title: {
        'en-IN': 'The Vessel of Ananda • Silambam & Kalaripayattu',
        'hi-IN': 'आनंद का पात्र • सिलंबम और कलरीपायट्टु',
        'or-IN': 'ଆନନ୍ଦର ପାତ୍ର • ସିଲମ୍ବମ୍ ଓ କଲରିପାୟଟ୍ଟୁ'
      },
      Andhakasura_Name: {
        'en-IN': 'ANDHAKĀSURA',
        'hi-IN': 'अंधकासुर',
        'or-IN': 'ଅନ୍ଧକାସୁର'
      },
      Andhakasura_Title: {
        'en-IN': 'The Rudra Wrath • Thang-Ta, Vallari & Malla-Yuddha',
        'hi-IN': 'रुद्र क्रोध • थांग-ता, वल्लरी और मल्ल-युद्ध',
        'or-IN': 'ରୁଦ୍ର କ୍ରୋଧ • ଥାଙ୍ଗ-ତା, ବଲ୍ଲରୀ ଓ ମଲ୍ଲ-ଯୁଦ୍ଧ'
      },
      Stance_Silambam: {
        'en-IN': 'Silambam (Veechu Nilai)',
        'hi-IN': 'सिलंबम (वीचु निलै)',
        'or-IN': 'ସିଲମ୍ବମ୍ (ବୀଚୁ ନିଲୈ)'
      },
      Stance_Kalaripayattu: {
        'en-IN': 'Kalaripayattu (Puliyankam)',
        'hi-IN': 'कलरीपायट्टु (पुलियंकम)',
        'or-IN': 'କଲରିପାୟଟ୍ଟୁ (ପୁଲିୟങ്കମ୍)'
      },
      Stance_ThangTa: {
        'en-IN': 'Thang-Ta (Pacing Force)',
        'hi-IN': 'थांग-ता (द्वि-खड्ग मुद्रा)',
        'or-IN': 'ଥାଙ୍ଗ-ତା (ଦ୍ୱି-ଖड्ଗ ମୁଦ୍ରା)'
      }
    },
    Character_Moves: {
      kalam_probe: {
        name: {
          'en-IN': 'Kālam Probe',
          'hi-IN': 'कालम प्रोब (तीव्र दंड प्रहार)',
          'or-IN': 'କାଳମ୍ ପ୍ରୋବ୍ (ତୀବ୍ର ଦଣ୍ଡ ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Rapid Silambam bamboo-alloy staff thrust; fastest mid-range poke to establish rhythm.',
          'hi-IN': 'तीव्र सिलंबम बांस-मिश्रित दंड प्रहार; ताल स्थापित करने के लिए सबसे तेज़ मध्य-दूरी का आक्रमण।',
          'or-IN': 'ତୀବ୍ର ସିଲମ୍ବମ୍ ବାଉଁଶ-ମିଶ୍ରିତ ଦଣ୍ଡ ପ୍ରହାର; ତାଳ ସ୍ଥାପନ ପାଇଁ ସବୁଠାରୁ ଦ୍ରୁତ ମଧ୍ୟ-ଦୂରତା ଆକ୍ରମଣ।'
        }
      },
      agni_sweep: {
        name: {
          'en-IN': 'Agni Sweep',
          'hi-IN': 'अग्नि स्वीप (निम्न दंड प्रहार)',
          'or-IN': 'ଅଗ୍ନି ସ୍ୱିପ୍ (ନିମ୍ନ ଦଣ୍ଡ ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Rotational low Silambam sweep that trips standing opponents onto the black ice.',
          'hi-IN': 'घूर्णनशील निम्न सिलंबम प्रहार जो खड़े प्रतिद्वंद्वी को काली बर्फ पर गिरा देता है।',
          'or-IN': 'ଘୂର୍ଣ୍ଣନଶୀଳ ନିମ୍ନ ସିଲମ୍ବମ୍ ପ୍ରହାର ଯାହା ଠିଆ ହୋଇଥିବା ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱୀଙ୍କୁ କୃଷ୍ଣ ବରଫରେ ପକାଇଦିଏ।'
        }
      },
      damru_launch: {
        name: {
          'en-IN': 'Damru Launch',
          'hi-IN': 'डमरू लॉन्च (ऊर्ध्व प्रक्षेपण)',
          'or-IN': 'ଡମ୍ବୁରୁ ଲଞ୍ଚ (ଊର୍ଦ୍ଧ୍ୱ ପ୍ରକ୍ଷେପଣ)'
        },
        properties: {
          'en-IN': 'Upward kinetic staff vault that launches the opponent airborne for juggle strings.',
          'hi-IN': 'ऊर्ध्व गतिज दंड प्रहार जो प्रतिद्वंद्वी को हवा में उछालकर कॉम्बो श्रृंखला शुरू करता है।',
          'or-IN': 'ଊର୍ଦ୍ଧ୍ୱ ଗତିଜ ଦଣ୍ଡ ପ୍ରହାର ଯାହା ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱୀଙ୍କୁ ଆକାଶକୁ ଉଠାଇ କମ୍ବୋ ଶୃଙ୍ଖଳା ଆରମ୍ଭ କରେ।'
        }
      },
      nataraja_spin: {
        name: {
          'en-IN': 'Nataraja Spin',
          'hi-IN': 'नटराज चक्र (बहु-प्रहार भंवर)',
          'or-IN': 'ନଟରାଜ ଚକ୍ର (ବହୁ-ପ୍ରହାର ଭଉଁରୀ)'
        },
        properties: {
          'en-IN': 'Multi-hit spinning staff vortex; deflects incoming Vallari projectiles during active frames.',
          'hi-IN': 'बहु-प्रहार घूर्णन दंड भंवर; सक्रिय फ्रेम के दौरान आने वाले वल्लरी प्रक्षेपास्त्रों को मोड़ देता है।',
          'or-IN': 'ବହୁ-ପ୍ରହାର ଘୂର୍ଣ୍ଣନ ଦଣ୍ଡ ଭଉଁରୀ; ସକ୍ରିୟ ଫ୍ରେମ୍ ସମୟରେ ଆସୁଥିବା ବଲ୍ଲରୀ ଅସ୍ତ୍ରକୁ ପ୍ରତିହତ କରେ।'
        }
      },
      urumi_split: {
        name: {
          'en-IN': 'Urumi Split',
          'hi-IN': 'उरुमी विभाजन (खड्ग-ढाल रूपांतरण)',
          'or-IN': 'ଉରୁମୀ ବିଭାଜନ (ଖड्ଗ-ଢାଲ ରୂପାନ୍ତର)'
        },
        properties: {
          'en-IN': 'Splits the Silambam staff into Kalaripayattu short-sword & buckler shield (6f std / 2f Tāla).',
          'hi-IN': 'सिलंबम दंड को कलरीपायट्टु लघु-खड्ग और ढाल में विभाजित करता है (६ फ्रेम मानक / २ फ्रेम ताल)।',
          'or-IN': 'ସିଲମ୍ବମ୍ ଦଣ୍ଡକୁ କଲରିପାୟଟ୍ଟୁ କ୍ଷୁଦ୍ର-ଖड्ଗ ଓ ଢାଲରେ ବିଭାଜିତ କରେ (୬ ଫ୍ରେମ୍ ମାନକ / ୨ ଫ୍ରେମ୍ ତାଳ)।'
        }
      },
      prana_bind: {
        name: {
          'en-IN': 'Prāṇa Bind',
          'hi-IN': 'प्राण बंधन (वर्म कलै प्रहार)',
          'or-IN': 'ପ୍ରାଣ ବନ୍ଧନ (ବର୍ମ କଳୈ ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Varma Kalai nerve-point strike; freezes opponent Tandav meter gain for 4.0 seconds (240 frames).',
          'hi-IN': 'वर्म कलै मर्म-बिंदु प्रहार; प्रतिद्वंद्वी के तांडव गेज को ४.० सेकंड (२४० फ्रेम) के लिए स्थिर करता है।',
          'or-IN': 'ବର୍ମ କଳୈ ମର୍ମ-ବିନ୍ଦୁ ପ୍ରହାର; ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱୀଙ୍କ ତାଣ୍ଡବ ଗେଜ୍ କୁ ୪.୦ ସେକେଣ୍ଡ (୨୪୦ ଫ୍ରେମ୍) ପାଇଁ ସ୍ଥିର କରେ।'
        }
      },
      nataraja_deflection: {
        name: {
          'en-IN': 'Nataraja Deflection',
          'hi-IN': 'नटराज डिफ्लेक्शन (१५ फ्रेम फ्रीज)',
          'or-IN': 'ନଟରାଜ ଡିଫ୍ଲେକ୍ସନ୍ (୧୫ ଫ୍ରେମ୍ ଫ୍ରିଜ୍)'
        },
        properties: {
          'en-IN': 'Rhythmic parry: hitting R1 on a Damru downbeat freezes the global loop for 15f and locks the attacker for +18f.',
          'hi-IN': 'तालमय रक्षा: डमरू की थाप पर R1 दबाने से १५ फ्रेम का ग्लोबल फ्रीज और आक्रमणकारी पर +१८ फ्रेम का स्टैगर लॉक लगता है।',
          'or-IN': 'ତାଳମୟ ରକ୍ଷା: ଡମ୍ବୁରୁ ତାଳରେ R1 ଦବାଇଲେ ୧୫ ଫ୍ରେମ୍ ଗ୍ଲୋବାଲ୍ ଫ୍ରିଜ୍ ଓ ଆକ୍ରମଣକାରୀଙ୍କ ଉପରେ +୧୮ ଫ୍ରେମ୍ ଷ୍ଟାଗର୍ ଲକ୍ ହୁଏ।'
        }
      },
      simha_leap: {
        name: {
          'en-IN': 'Simha Leap',
          'hi-IN': 'सिंह छलांग (कलरीपायट्टु प्रहार)',
          'or-IN': 'ସିଂହ ଲମ୍ଫ (କଲରିପାୟଟ୍ଟୁ ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Acrobatic airborne lion-stance cleaver strike with dynamic Disney cloth turbulence.',
          'hi-IN': 'सिंह मुद्रा में हवाई कलाबाजी खड्ग प्रहार, डिज्नी क्लॉथ फिजिक्स के साथ।',
          'or-IN': 'ସିଂହ ମୁଦ୍ରାରେ ଆକାଶମାର୍ଗ କଳାବାଜି ଖड्ଗ ପ୍ରହାର, ଡିଜ୍ନୀ କ୍ଲଥ୍ ଫିଜିକ୍ସ ସହିତ।'
        }
      },
      silambam_recombine: {
        name: {
          'en-IN': 'Silambam Recombine',
          'hi-IN': 'सिलंबम पुनर्संयोजन (दंड लॉक)',
          'or-IN': 'ସିଲମ୍ବମ୍ ପୁନଃସଂଯୋଜନ (ଦଣ୍ଡ ଲକ୍)'
        },
        properties: {
          'en-IN': 'Combines Kalaripayattu sword & shield back into Silambam long staff (6f std / 2f Tāla).',
          'hi-IN': 'कलरीपायट्टु खड्ग और ढाल को पुनः सिलंबम दीर्घ दंड में जोड़ता है (६ फ्रेम मानक / २ फ्रेम ताल)।',
          'or-IN': 'କଲରିପାୟଟ୍ଟୁ ଖड्ଗ ଓ ଢାଲକୁ ପୁନର୍ବାର ସିଲମ୍ବମ୍ ଦୀର୍ଘ ଦଣ୍ଡରେ ଯୋଡ଼େ (୬ ଫ୍ରେମ୍ ମାନକ / ୨ ଫ୍ରେମ୍ ତାଳ)।'
        }
      },
      chakra_slash: {
        name: {
          'en-IN': 'Chakra Slash',
          'hi-IN': 'चक्र स्लैश (थांग-ता खड्ग वार)',
          'or-IN': 'ଚକ୍ର ସ୍ଲାଶ୍ (ଥାଙ୍ଗ-ତା ଖड्ଗ ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Fast horizontal cross-cut with the right Thang-Ta blade; primary combo starter.',
          'hi-IN': 'दाहिने थांग-ता खड्ग से तीव्र क्षैतिज प्रहार; प्राथमिक कॉम्बो आरंभकर्ता।',
          'or-IN': 'ଡାହାଣ ଥାଙ୍ଗ-ତା ଖड्ଗରେ ତୀବ୍ର ସମାନ୍ତରାଳ ପ୍ରହାର; ପ୍ରାଥମିକ କମ୍ବୋ ଆରମ୍ଭକାରୀ।'
        }
      },
      rudra_torrent: {
        name: {
          'en-IN': 'Rudra Torrent',
          'hi-IN': 'रुद्र प्रपात (द्वि-खड्ग प्रहार)',
          'or-IN': 'ରୁଦ୍ର ପ୍ରପାତ (ଦ୍ୱି-ଖड्ଗ ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Secondary spinning downward slash; creates heavy pushback and high chip damage on block.',
          'hi-IN': 'घूर्णनशील अधोमुखी खड्ग प्रहार; ब्लॉक करने पर भी भारी चिप क्षति और पीछे धकेलता है।',
          'or-IN': 'ଘୂର୍ଣ୍ଣନଶୀଳ ଅଧୋମୁଖୀ ଖड्ଗ ପ୍ରହାର; ବ୍ଲକ୍ କଲେ ମଧ୍ୟ ଭାରୀ ଚିପ୍ କ୍ଷତି ଓ ପଛକୁ ଠେଲିଦିଏ।'
        }
      },
      grip_splitter: {
        name: {
          'en-IN': 'Grip Splitter',
          'hi-IN': 'ग्रिप स्प्लिटर (निम्न प्रहार)',
          'or-IN': 'ଗ୍ରିପ୍ ସ୍ପ୍ଲିଟର୍ (ନିମ୍ନ ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Low ankle sweep using the sword pommel; cannot be low-profile countered.',
          'hi-IN': 'खड्ग की मूठ से टखने पर निम्न प्रहार; झुककर बचा नहीं जा सकता।',
          'or-IN': 'ଖड्ଗ ମୁଠାରେ ଗୋଇଠି ଉପରେ ନିମ୍ନ ପ୍ରହାର; ନଇଁ କରି ରକ୍ଷା ପାଇହେବ ନାହିଁ।'
        }
      },
      pralaya_cleave: {
        name: {
          'en-IN': 'Pralaya Cleave',
          'hi-IN': 'प्रलय विदारण (भारी शिरोपरि वार)',
          'or-IN': 'ପ୍ରଳୟ ବିଦାରଣ (ଭାରୀ ଶିରୋପରି ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Crushing heavy twin-blade overhead smash; forces a 12-frame stagger state on block.',
          'hi-IN': 'जुड़वां खड्गों से विनाशकारी शिरोपरि प्रहार; ब्लॉक पर १२ फ्रेम का स्टैगर लागू करता है।',
          'or-IN': 'ଯୁଗଳ ଖड्ଗରେ ବିନାଶକାରୀ ଶିରୋପରି ପ୍ରହାର; ବ୍ଲକ୍ ଉପରେ ୧୨ ଫ୍ରେମ୍ ଷ୍ଟାଗର୍ ଲାଗୁ କରେ।'
        }
      },
      vallari_loop: {
        name: {
          'en-IN': 'Vallari Loop',
          'hi-IN': 'वल्लरी चक्र (लौह बूमरैंग)',
          'or-IN': 'ବଲ୍ଲରୀ ଚକ୍ର (ଲୌହ ବୁମେରାଂ)'
        },
        properties: {
          'en-IN': 'Throws the iron Vallari boomerang out of bounds; strikes from behind after 40 frames.',
          'hi-IN': 'तीन-मुंह वाले लौह वल्लरी को सीमा से बाहर फेंकता है; ४० फ्रेम बाद पीछे से प्रहार करता है।',
          'or-IN': 'ତିନି-ମୁହାଁ ଲୌହ ବଲ୍ଲରୀକୁ ସୀମା ବାହାରକୁ ଫିଙ୍ଗେ; ୪୦ ଫ୍ରେମ୍ ପରେ ପଛପଟୁ ପ୍ରହାର କରେ।'
        }
      },
      iron_fortress: {
        name: {
          'en-IN': 'Iron Fortress',
          'hi-IN': 'लौह दुर्ग (कवच प्रहार)',
          'or-IN': 'ଲୌହ ଦୁର୍ଗ (କବଚ ପ୍ରହାର)'
        },
        properties: {
          'en-IN': 'Charging titanium-plate thrust that absorbs one incoming light projectile strike.',
          'hi-IN': 'टाइटेनियम कवच के साथ आगे बढ़ता प्रहार जो एक हल्के आक्रमण को सोख लेता है।',
          'or-IN': 'ଟାଇଟାନିୟମ୍ କବଚ ସହିତ ଆଗକୁ ବଢୁଥିବା ପ୍ରହାର ଯାହା ଗୋଟିଏ ହାଲୁକା ଆକ୍ରମଣକୁ ଶୋଷି ନିଏ।'
        }
      },
      asura_clasp: {
        name: {
          'en-IN': 'Asura Clasp',
          'hi-IN': 'असुर पाश (मल्ल-युद्ध कमांड पकड़)',
          'or-IN': 'ଅସୁର ପାଶ (ମଲ୍ଲ-ଯୁଦ୍ଧ କମାଣ୍ଡ ଗ୍ରାବ୍)'
        },
        properties: {
          'en-IN': 'Malla-Yuddha neck lift and spine-crushing ground slam; breaks all blocks (65f Socket Lock).',
          'hi-IN': 'मल्ल-युद्ध गर्दन उठाकर रीढ़ तोड़ने वाला पटका; सभी ब्लॉक तोड़कर ६५ फ्रेम तक लॉक करता है।',
          'or-IN': 'ମଲ୍ଲ-ଯୁଦ୍ଧ ବେକ ଉଠାଇ ମେରୁଦଣ୍ଡ ଭାଙ୍ଗୁଥିବା ଆଛାଡ଼; ସମସ୍ତ ବ୍ଲକ୍ ଭାଙ୍ଗି ୬୫ ଫ୍ରେମ୍ ଲକ୍ କରେ।'
        }
      },
      shadow_leak: {
        name: {
          'en-IN': 'Shadow Leak',
          'hi-IN': 'छाया रिसाव (रक्तबीज प्रतिघात)',
          'or-IN': 'ଛାୟା ରିସାବ (ରକ୍ତବୀଜ ପ୍ରତିଘାତ)'
        },
        properties: {
          'en-IN': 'Spawns a brief Rakta-Bīja Shadow Clone that locks the attacker feet for 45 frames.',
          'hi-IN': 'रक्तबीज छाया क्लोन उत्पन्न करता है जो आक्रमणकारी के पैरों को ४५ फ्रेम के लिए जकड़ लेता है।',
          'or-IN': 'ରକ୍ତବୀଜ ଛାୟା କ୍ଲୋନ୍ ସୃଷ୍ଟି କରେ ଯାହା ଆକ୍ରମଣକାରୀଙ୍କ ପାଦକୁ ୪୫ ଫ୍ରେମ୍ ପାଇଁ ବାନ୍ଧି ରଖେ।'
        }
      }
    }
  }
};

export interface LocaleOption {
  code: SupportedLocale;
  label: string;
  nativeLabel: string;
}

const SUPPORTED_LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'en-IN', label: 'English (India)', nativeLabel: 'EN-IN' },
  { code: 'hi-IN', label: 'Hindi (Devanagari)', nativeLabel: 'हिन्दी (hi-IN)' },
  { code: 'or-IN', label: 'Odia (Kalinga Script)', nativeLabel: 'ଓଡ଼ିଆ (or-IN)' }
];

export class TandavLocalizationEngine {
  private currentLocale: SupportedLocale = TANDAV_LOCALIZATION_MATRIX.GameConfiguration.DefaultFallback;

  public getLocale(): SupportedLocale {
    return this.currentLocale;
  }

  public getActiveLocale(): SupportedLocale {
    return this.currentLocale;
  }

  public getSupportedLocales(): LocaleOption[] {
    return SUPPORTED_LOCALE_OPTIONS;
  }

  public setLocale(locale: SupportedLocale): void {
    if (TANDAV_LOCALIZATION_MATRIX.GameConfiguration.SupportedLanguages.includes(locale)) {
      this.currentLocale = locale;
    } else {
      this.currentLocale = TANDAV_LOCALIZATION_MATRIX.GameConfiguration.DefaultFallback;
    }
  }

  public getMenuString(key: string, locale: SupportedLocale = this.currentLocale): string {
    const entry = TANDAV_LOCALIZATION_MATRIX.LocalizationMatrix.Menus[key];
    if (!entry) return key;
    return entry[locale] || entry['en-IN'];
  }

  public getButtonString(key: string, locale: SupportedLocale = this.currentLocale): string {
    const entry =
      TANDAV_LOCALIZATION_MATRIX.LocalizationMatrix.UI_Buttons[key] ||
      TANDAV_LOCALIZATION_MATRIX.LocalizationMatrix.Menus[key];
    if (!entry) return key;
    return entry[locale] || entry['en-IN'];
  }

  public getCombatAlert(key: string, locale: SupportedLocale = this.currentLocale): string {
    const entry = TANDAV_LOCALIZATION_MATRIX.LocalizationMatrix.Combat_Alerts[key];
    if (!entry) return key;
    return entry[locale] || entry['en-IN'];
  }

  public getEngineeringAlert(key: string, locale: SupportedLocale = this.currentLocale): string {
    const entry = TANDAV_LOCALIZATION_MATRIX.LocalizationMatrix.Engineering_Alerts[key];
    if (!entry) return key;
    return entry[locale] || entry['en-IN'];
  }

  public getFighterString(key: string, locale: SupportedLocale = this.currentLocale): string {
    const entry = TANDAV_LOCALIZATION_MATRIX.LocalizationMatrix.Fighters[key];
    if (!entry) return key;
    return entry[locale] || entry['en-IN'];
  }

  public getFighterLocalization(
    fighter: 'bhairav' | 'andhakasura',
    locale: SupportedLocale = this.currentLocale
  ): { name: string; title: string } {
    if (fighter === 'bhairav') {
      return {
        name: this.getFighterString('Bhairav_Name', locale),
        title: this.getFighterString('Bhairav_Title', locale)
      };
    }
    return {
      name: this.getFighterString('Andhakasura_Name', locale),
      title: this.getFighterString('Andhakasura_Title', locale)
    };
  }

  public getMoveLocalization(
    moveId: string,
    fallbackName: string,
    fallbackProperties: string,
    locale: SupportedLocale = this.currentLocale
  ): { name: string; properties: string; description: string } {
    const entry = TANDAV_LOCALIZATION_MATRIX.LocalizationMatrix.Character_Moves[moveId];
    if (!entry) {
      return {
        name: fallbackName,
        properties: fallbackProperties,
        description: fallbackProperties
      };
    }
    const propText = entry.properties[locale] || fallbackProperties;
    return {
      name: entry.name[locale] || fallbackName,
      properties: propText,
      description: propText
    };
  }
}

export const tandavLocalization = new TandavLocalizationEngine();

