export const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'de', label: 'Deutsch' },
  { code: 'el', label: 'Ελληνικά' },
] as const

export type Locale = (typeof languages)[number]['code']

const STORAGE_KEY = 'nebula-locale'

let currentLocale: Locale = 'en'
const listeners = new Set<() => void>()

export function getLocale(): Locale {
  return currentLocale
}

export function setLocale(locale: Locale): void {
  if (currentLocale === locale) return
  currentLocale = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
  listeners.forEach((fn) => fn())
}

export function onLocaleChange(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function initLocale(): void {
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
  if (saved && languages.some((l) => l.code === saved)) {
    currentLocale = saved
  }
  document.documentElement.lang = currentLocale
}

type TranslationDict = Record<string, string>

const translations: Record<Locale, TranslationDict> = {
  en: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navigation',
    navFooter: 'Sta&Kac Science Brewery — Belgium',
    navHome: 'Home',
    navWho: 'Who We Are',
    navCollection: 'Our Collection',
    navScience: 'More About Beer',
    language: 'Language',
    footer: '© Sta&Kac Science Brewery — Belgium',
    homeEyebrow: 'Science Brewery — Belgium',
    homeTitle: 'Sta&Kac',
    homeLead:
      'Where quantum physics meets Belgian craft. Each brew is a scientific experiment — from Schrödinger\'s superposition to dark matter accretion disks.',
    homeCtaCollection: 'Explore Collection',
    homeCtaMission: 'Our Mission',
    aboutEyebrow: 'Mission Briefing',
    aboutTitle: 'Who We Are',
    aboutLead:
      'A collective of brewmasters, biochemists, and aerospace engineers united by one question: what does perfection taste like at the edge of the known universe?',
    aboutLab: 'The Lab',
    aboutLabText:
      'Our orbital fermentation facility operates at 400 km altitude, where microgravity reveals yeast behavior impossible to replicate on Earth. Every batch is logged, sequenced, and calibrated.',
    aboutVision: 'The Vision',
    aboutVisionText:
      'We believe beer is a science and an art. By combining spectroscopic analysis with centuries of brewing tradition, we push flavor into uncharted territory.',
    aboutCraft: 'The Craft',
    aboutCraftText:
      'From grain selection to bottle conditioning, every variable is controlled. Temperature curves, pH levels, dissolved oxygen — nothing is left to chance.',
    aboutQuote:
      '"We don\'t just brew beer. We conduct flavor experiments at the speed of light."',
    aboutQuoteAuthor: '— Dr. Elena Voss, Chief Fermentation Officer',
    collectionEyebrow: 'Specimen Catalog',
    collectionTitle: 'Our Collection',
    collectionLead:
      'Six physics-inspired flagship brews. Each label is a scientific concept — each pour, an experiment.',
    specimen: 'Specimen',
    scienceEyebrow: 'Research Division',
    scienceTitle: 'More About Beer',
    scienceLead:
      'The science behind the pour. Understanding fermentation at a molecular level transforms good beer into something extraordinary.',
    step1Title: 'Malt & Mashing',
    step1Text:
      'Enzymes convert starches into fermentable sugars. We monitor saccharification rest temperatures to within 0.1°C — the difference between good and transcendent.',
    step2Title: 'Hop Chemistry',
    step2Text:
      'Alpha acids isomerize during the boil, creating bitterness. Late-addition hops preserve volatile terpenes — myrcene, humulene, linalool — the aromatic fingerprint of each brew.',
    step3Title: 'Yeast Fermentation',
    step3Text:
      'Saccharomyces cerevisiae consumes sugars, producing ethanol and esters. Our lab maintains 47 proprietary yeast strains, each catalogued by genome sequence.',
    step4Title: 'Conditioning & Carbonation',
    step4Text:
      'Post-fermentation maturation allows flavors to integrate. We carbonate using precision sparging — targeting exact volumes of CO₂ for the perfect mouthfeel.',
    formulaLabel: 'Fermentation Equation',
    formulaCaption:
      'Glucose transformed into ethanol, carbon dioxide, and the energy that powers life — and great beer.',
    beerSchrodingerNote:
      'Superposition Edition — two states coexist until the bottle is opened. Hazy IPA and dry IPA in quantum harmony.',
    beerDarkMatterNote:
      'Deep. Mysterious. Unstoppable. Amber ale swirling at the edge of an event horizon.',
    beerBottomQuarkNote:
      'Subatomic precision. Gluon-exchange hops with a Feynman-diagram fermentation profile.',
    beerSupergravityNote:
      'Powerful. Complex. Boundless. Belgian Tripel from a black hole accretion disk.',
    beerWhiteDwarfNote:
      'Light. Fruity. Unfiltered. Weizen radiating the brilliance of a dying star.',
    beerDarkEnergyNote:
      'The force accelerating the universe — captured in every pour.',
  },
  fr: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navigation',
    navFooter: 'Station de brassage orbitale — Secteur 7G',
    navHome: 'Accueil',
    navWho: 'Qui sommes-nous',
    navCollection: 'Notre collection',
    navScience: 'En savoir plus sur la bière',
    language: 'Langue',
    footer: '© 2847 Sta&Kac Science Brewery — Division brasserie scientifique',
    homeEyebrow: 'Fondé en l\'an orbital 2847',
    homeTitle: 'Sta&Kac Science Brewery',
    homeLead:
      'Là où la précision moléculaire rencontre l\'art interstellaire. Nous brassons la bière comme les astrophysiciens cartographient les galaxies — avec rigueur, passion et une touche de poussière d\'étoiles.',
    homeCtaCollection: 'Découvrir la collection',
    homeCtaMission: 'Notre mission',
    aboutEyebrow: 'Briefing de mission',
    aboutTitle: 'Qui sommes-nous',
    aboutLead:
      'Un collectif de maîtres brasseurs, biochimistes et ingénieurs aérospatiaux uni par une question : à quoi goûte la perfection aux confins de l\'univers connu ?',
    aboutLab: 'Le laboratoire',
    aboutLabText:
      'Notre installation de fermentation orbitale opère à 400 km d\'altitude, où la microgravité révèle des comportements de levure impossibles à reproduire sur Terre. Chaque lot est enregistré, séquencé et calibré.',
    aboutVision: 'La vision',
    aboutVisionText:
      'Nous croyons que la bière est à la fois science et art. En combinant l\'analyse spectroscopique et des siècles de tradition brassicole, nous explorons des saveurs inédites.',
    aboutCraft: 'Le savoir-faire',
    aboutCraftText:
      'De la sélection des grains à la garde en bouteille, chaque variable est maîtrisée. Courbes de température, pH, oxygène dissous — rien n\'est laissé au hasard.',
    aboutQuote:
      '« Nous ne brassons pas seulement de la bière. Nous menons des expériences gustatives à la vitesse de la lumière. »',
    aboutQuoteAuthor: '— Dr Elena Voss, directrice de la fermentation',
    collectionEyebrow: 'Catalogue des spécimens',
    collectionTitle: 'Notre collection',
    collectionLead:
      'Six bières phares, fruit chacune de centaines d\'expériences contrôlées. Sélectionnez un spécimen pour découvrir son profil moléculaire.',
    specimen: 'Spécimen',
    scienceEyebrow: 'Division recherche',
    scienceTitle: 'En savoir plus sur la bière',
    scienceLead:
      'La science derrière le service. Comprendre la fermentation au niveau moléculaire transforme une bonne bière en expérience extraordinaire.',
    step1Title: 'Malt et empâtage',
    step1Text:
      'Les enzymes transforment les amidons en sucres fermentescibles. Nous surveillons les repos de saccharification à 0,1 °C près — la différence entre bon et transcendant.',
    step2Title: 'Chimie du houblon',
    step2Text:
      'Les acides alpha s\'isomérisent à l\'ébullition, créant l\'amertume. Les houblons en fin d\'ébullition préservent les terpènes volatils — myrcène, humulène, linalol.',
    step3Title: 'Fermentation levurienne',
    step3Text:
      'Saccharomyces cerevisiae consomme les sucres, produisant éthanol et esters. Notre labo maintient 47 souches propriétaires, chacune cataloguée par séquençage génomique.',
    step4Title: 'Garde et carbonatation',
    step4Text:
      'La maturation post-fermentation permet l\'intégration des saveurs. Nous carbonatons avec précision — visant des volumes exacts de CO₂ pour une texture parfaite.',
    formulaLabel: 'Équation de fermentation',
    formulaCaption:
      'Le glucose transformé en éthanol, dioxyde de carbone et énergie — ce qui alimente la vie, et une grande bière.',
    beerSchrodingerNote:
      'Édition Superposition — deux états coexistent jusqu\'à l\'ouverture. IPA trouble et IPA sèche en harmonie quantique.',
    beerDarkMatterNote:
      'Profond. Mystérieux. Imparable. Amber ale au bord de l\'horizon des événements.',
    beerBottomQuarkNote:
      'Précision subatomique. Houblons à échange de gluons, profil de fermentation Feynman.',
    beerSupergravityNote:
      'Puissant. Complexe. Sans limites. Tripel belge d\'un disque d\'accrétion.',
    beerWhiteDwarfNote:
      'Léger. Fruité. Non filtré. Weizen rayonnant comme une naine blanche.',
    beerDarkEnergyNote:
      'La force qui accélère l\'univers — capturée dans chaque gorgée.',
  },
  nl: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navigatie',
    navFooter: 'Orbitale brouwstation — Sector 7G',
    navHome: 'Home',
    navWho: 'Over ons',
    navCollection: 'Onze collectie',
    navScience: 'Meer over bier',
    language: 'Taal',
    footer: '© 2847 Sta&Kac Science Brewery — Wetenschappelijke brouwerij',
    homeEyebrow: 'Opgericht in orbitaal jaar 2847',
    homeTitle: 'Sta&Kac Science Brewery',
    homeLead:
      'Waar moleculaire precisie interstellaire ambacht ontmoet. Wij brouwen bier zoals astrofysici sterrenstelsels in kaart brengen — met data, passie en een vleugje sterrenstof.',
    homeCtaCollection: 'Collectie verkennen',
    homeCtaMission: 'Onze missie',
    aboutEyebrow: 'Missiebriefing',
    aboutTitle: 'Over ons',
    aboutLead:
      'Een collectief van brouwmeesters, biochemici en lucht- en ruimtevaartingen verenigd door één vraag: hoe smaakt perfectie aan de rand van het bekende universum?',
    aboutLab: 'Het lab',
    aboutLabText:
      'Onze orbitale fermentatiefaciliteit opereert op 400 km hoogte, waar microzwaartekracht gistgedrag onthult dat op aarde onmogelijk te repliceren is. Elke batch wordt gelogd, gesequenced en gekalibreerd.',
    aboutVision: 'De visie',
    aboutVisionText:
      'Wij geloven dat bier wetenschap én kunst is. Door spectroscopische analyse te combineren met eeuwen brouwtraditie, verkennen wij onbekend smaakterritorium.',
    aboutCraft: 'Het vak',
    aboutCraftText:
      'Van graanselectie tot flesrijping — elke variabele wordt gecontroleerd. Temperatuurcurves, pH-niveaus, opgelost zuurstof — niets wordt aan het toeval overgelaten.',
    aboutQuote:
      '"Wij brouwen niet alleen bier. Wij voeren smaakexperimenten uit met lichtsnelheid."',
    aboutQuoteAuthor: '— Dr. Elena Voss, hoofd fermentatie',
    collectionEyebrow: 'Specimencatalogus',
    collectionTitle: 'Onze collectie',
    collectionLead:
      'Zes vlaggenschipbieren, elk het resultaat van honderden gecontroleerde experimenten. Selecteer een specimen voor het moleculaire profiel.',
    specimen: 'Specimen',
    scienceEyebrow: 'Onderzoeksafdeling',
    scienceTitle: 'Meer over bier',
    scienceLead:
      'De wetenschap achter het schenken. Fermentatie op moleculair niveau begrijpen maakt goed bier buitengewoon.',
    step1Title: 'Mout & maischen',
    step1Text:
      'Enzymen zetten zetmeel om in vergistbare suikers. Wij monitoren saccharificatierusttemperaturen binnen 0,1°C — het verschil tussen goed en transcendent.',
    step2Title: 'Hopchemie',
    step2Text:
      'Alfazuren isomeriseren tijdens het koken en creëren bitterheid. Late hoptoevoegingen behouden vluchtige terpenen — myceen, humuleen, linalool.',
    step3Title: 'Gistfermentatie',
    step3Text:
      'Saccharomyces cerevisiae consumeert suikers en produceert ethanol en esters. Ons lab onderhoudt 47 proprietaire giststammen, elk gecatalogiseerd op genoom.',
    step4Title: 'Rijping & carbonatatie',
    step4Text:
      'Post-fermentatie rijping laat smaken integreren. Wij carbonateren met precisie — exacte CO₂-volumes voor de perfecte mouthfeel.',
    formulaLabel: 'Fermentatievergelijking',
    formulaCaption:
      'Glucose omgezet in ethanol, kooldioxide en energie — wat leven aandrijft, en geweldig bier.',
    beerSchrodingerNote:
      'Superpositie-editie — twee toestanden naast elkaar tot de fles geopend wordt.',
    beerDarkMatterNote:
      'Diep. Mysterieus. Onstuitbaar. Amber ale aan de rand van een gebeurtenishorizon.',
    beerBottomQuarkNote:
      'Subatomische precisie. Gluon-uitwisseling hop, Feynman-diagram fermentatie.',
    beerSupergravityNote:
      'Krachtig. Complex. Grenzeloos. Belgische tripel uit een accretieschijf.',
    beerWhiteDwarfNote:
      'Licht. Fruitig. Ongefilterd. Weizen stralend als een witte dwerg.',
    beerDarkEnergyNote:
      'De kracht die het universum versnelt — gevangen in elk glas.',
  },
  de: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navigation',
    navFooter: 'Orbitale Brauerei — Sektor 7G',
    navHome: 'Startseite',
    navWho: 'Über uns',
    navCollection: 'Unsere Kollektion',
    navScience: 'Mehr über Bier',
    language: 'Sprache',
    footer: '© 2847 Sta&Kac Science Brewery — Wissenschaftliche Brauerei',
    homeEyebrow: 'Gegr. im Orbitaljahr 2847',
    homeTitle: 'Sta&Kac Science Brewery',
    homeLead:
      'Wo molekulare Präzision interstellares Handwerk trifft. Wir brauen Bier, wie Astrophysiker Galaxien kartieren — mit Daten, Leidenschaft und Sternenstaub.',
    homeCtaCollection: 'Kollektion entdecken',
    homeCtaMission: 'Unsere Mission',
    aboutEyebrow: 'Missionsbriefing',
    aboutTitle: 'Über uns',
    aboutLead:
      'Ein Kollektiv aus Braumeistern, Biochemikern und Luft- und Raumfahrtingenieuren, vereint durch eine Frage: Wie schmeckt Perfektion am Rand des bekannten Universums?',
    aboutLab: 'Das Labor',
    aboutLabText:
      'Unsere orbitale Fermentationsanlage arbeitet in 400 km Höhe, wo Mikrogravitation Hefeverhalten offenbart, das auf der Erde unmöglich ist. Jede Charge wird protokolliert, sequenziert und kalibriert.',
    aboutVision: 'Die Vision',
    aboutVisionText:
      'Wir glauben, Bier ist Wissenschaft und Kunst. Durch spektroskopische Analyse und jahrhundertealte Brautradition erschließen wir unbekanntes Geschmacksgebiet.',
    aboutCraft: 'Das Handwerk',
    aboutCraftText:
      'Von der Malzauswahl bis zur Flaschenreifung — jede Variable wird kontrolliert. Temperaturkurven, pH-Werte, gelöster Sauerstoff — nichts dem Zufall überlassen.',
    aboutQuote:
      '„Wir brauen nicht nur Bier. Wir führen Geschmacksexperimente mit Lichtgeschwindigkeit durch."',
    aboutQuoteAuthor: '— Dr. Elena Voss, Leiterin Fermentation',
    collectionEyebrow: 'Spezimenkatalog',
    collectionTitle: 'Unsere Kollektion',
    collectionLead:
      'Sechs Flaggschiff-Biere, jedes aus hunderten kontrollierten Experimenten. Wählen Sie ein Spezimen für sein molekulares Profil.',
    specimen: 'Spezimen',
    scienceEyebrow: 'Forschungsabteilung',
    scienceTitle: 'Mehr über Bier',
    scienceLead:
      'Die Wissenschaft hinter dem Ausschank. Fermentation auf molekularer Ebene macht gutes Bier außergewöhnlich.',
    step1Title: 'Malz & Maischverfahren',
    step1Text:
      'Enzyme wandeln Stärke in vergärbare Zucker um. Wir überwachen Saccharifizierungsruhetemperaturen auf 0,1 °C — der Unterschied zwischen gut und transzendent.',
    step2Title: 'Hopfenchemie',
    step2Text:
      'Alpha-Säuren isomerisieren beim Kochen und erzeugen Bitterkeit. Späte Hopfenzugaben bewahren flüchtige Terpene — Myrcen, Humulen, Linalool.',
    step3Title: 'Hefegärung',
    step3Text:
      'Saccharomyces cerevisiae verbraucht Zucker und produziert Ethanol und Ester. Unser Labor pflegt 47 proprietäre Hefestämme, genomisch katalogisiert.',
    step4Title: 'Reifung & Karbonisierung',
    step4Text:
      'Post-Gärungsreifung lässt Aromen verschmelzen. Wir karbonisieren präzise — exakte CO₂-Mengen für perfekten Mundgefühl.',
    formulaLabel: 'Gärungsgleichung',
    formulaCaption:
      'Glucose verwandelt in Ethanol, Kohlendioxid und Energie — was Leben antreibt und großartiges Bier.',
    beerSchrodingerNote:
      'Superpositions-Edition — zwei Zustände koexistieren bis zur Öffnung.',
    beerDarkMatterNote:
      'Tief. Geheimnisvoll. Unaufhaltsam. Amber Ale am Ereignishorizont.',
    beerBottomQuarkNote:
      'Subatomare Präzision. Gluon-Austausch-Hopfen, Feynman-Diagramm-Gärung.',
    beerSupergravityNote:
      'Kraftvoll. Komplex. Grenzenlos. Belgisches Tripel aus einer Akkretionsscheibe.',
    beerWhiteDwarfNote:
      'Hell. Fruchtig. Unfiltriert. Weizen strahlend wie ein Weißer Zwerg.',
    beerDarkEnergyNote:
      'Die Kraft, die das Universum beschleunigt — in jedem Schluck gefangen.',
  },
  el: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Πλοήγηση',
    navFooter: 'Ορβital ζυθοποιείο — Τομέας 7G',
    navHome: 'Αρχική',
    navWho: 'Ποιοι είμαστε',
    navCollection: 'Η συλλογή μας',
    navScience: 'Περισσότερα για τη μπύρα',
    language: 'Γλώσσα',
    footer: '© 2847 Sta&Kac Science Brewery — Επιστημονική ζυθοποιία',
    homeEyebrow: 'Ίδρυση έτους τροχιάς 2847',
    homeTitle: 'Sta&Kac Science Brewery',
    homeLead:
      'Όπου η μοριακή ακρίβεια συναντά τη διαστellar τέχνη. Ζυθοποιούμε όπως οι αστροφυσικοί χαρτογραφούν τους γαλαξίες — με δεδομένα, πάθος και μια πινελιά αστρόσκονης.',
    homeCtaCollection: 'Εξερεύνηση συλλογής',
    homeCtaMission: 'Η αποστολή μας',
    aboutEyebrow: 'Ενημέρωση αποστολής',
    aboutTitle: 'Ποιοι είμαστε',
    aboutLead:
      'Ένας συλλογικός χώρος ζυθοποιών, βιοχημικών και μηχανικών αεροδιαστήματος, ενωμένοι από ένα ερώτημα: πώς γεύεται η τελειότητα στα όρια του γνωστού σύμπαντος;',
    aboutLab: 'Το εργαστήριο',
    aboutLabText:
      'Η ορβital εγκατάσταση ζύμωσής μας λειτουργεί σε ύψος 400 χλμ., όπου η μικροβαρύτητα αποκαλύπτει συμπεριφορές ζύμης αδύνατες να αναπαραχθούν στη Γη. Κάθε παρτίδα καταγράφεται, αλληλουχείται και βαθμονομείται.',
    aboutVision: 'Το όραμα',
    aboutVisionText:
      'Πιστεύουμε ότι η μπύρα είναι επιστήμη και τέχνη. Συνδυάζοντας φασματοσκοπική ανάλυση με αιώνες παράδοσης, εξερευνούμε άγνωστες γεύσεις.',
    aboutCraft: 'Η τέχνη',
    aboutCraftText:
      'Από την επιλογή δημητριακών έως την ωρίμανση στη φιάλη — κάθε μεταβλητή ελέγχεται. Καμπύλες θερμοκρασίας, pH, διαλυμένο οξυγόνο — τίποτα δεν αφήνεται στην τύχη.',
    aboutQuote:
      '«Δεν ζυθοποιούμε απλώς μπύρα. Διεξάγουμε πειράματα γεύσης με την ταχύτητα του φωτός.»',
    aboutQuoteAuthor: '— Δρ. Elena Voss, Διευθύντρια ζύμωσης',
    collectionEyebrow: 'Κατάλογος δειγμάτων',
    collectionTitle: 'Η συλλογή μας',
    collectionLead:
      'Έξι εμβληματικές μπύρες, καρπός εκατοντάδων ελεγχόμενων πειραμάτων. Επιλέξτε δείγμα για το μοριακό του προφίλ.',
    specimen: 'Δείγμα',
    scienceEyebrow: 'Τμήμα έρευνας',
    scienceTitle: 'Περισσότερα για τη μπύρα',
    scienceLead:
      'Η επιστήμη πίσω από το σερβίρισμα. Η κατανόηση της ζύμωσης σε μοριακό επίπεδο μετατρέπει την καλή μπύρα σε κάτι εξαιρετικό.',
    step1Title: 'Βύη & ζύμωση',
    step1Text:
      'Τα ένζυμα μετατρέπουν τους αμύλους σε ζυμώσιμους σάκχαρα. Παρακολουθούμε τις θερμοκρασίες ανάπαυσης σακχαροποίησης στους 0,1 °C — η διαφορά μεταξύ καλού και υπέρτατου.',
    step2Title: 'Χημεία λυκίσκου',
    step2Text:
      'Τα α-οξέα ισομερώνονται κατά το βράσιμο, δημιουργώντας πικρότητα. Οι καθυστερημένες προσθήκες λυκίσκου διατηρούν πτητικά τερπένια — μυρκένη, χουμουλένη, λιναλόλη.',
    step3Title: 'Ζύμωση',
    step3Text:
      'Η Saccharomyces cerevisiae καταναλώνει σάκχαρα, παράγοντας αιθανόλη και εστέρες. Το εργαστήριό μας διατηρεί 47 ιδιόκτητες στελέχη, καταγεγραμμένα γενετικά.',
    step4Title: 'Ωρίμανση & ανθρακίωση',
    step4Text:
      'Η μετα-ζύμωση επιτρέπει την ενσωμάτωση γεύσεων. Ανθρακώνουμε με ακρίβεια — ακριβείς όγκοι CO₂ για τέλεια υφή.',
    formulaLabel: 'Εξίσωση ζύμωσης',
    formulaCaption:
      'Η γλυκόζη μετατρέπεται σε αιθανόλη, διοξείδιο του άνθρακα και ενέργεια — που τροφοδοτεί τη ζωή και μια σπουδαία μπύρα.',
    beerSchrodingerNote:
      'Έκδοση υπέρθεσης — δύο καταστάσεις συνυπάρχουν μέχρι το άνοιγμα.',
    beerDarkMatterNote:
      'Βαθιά. Μυστηριώδης. Ασταμάτητη. Amber ale στην άκρη του ορίζοντα συμβάντων.',
    beerBottomQuarkNote:
      'Υποατομική ακρίβεια. Λυκίσκος ανταλλαγής γλουονίων, ζύμωση Feynman.',
    beerSupergravityNote:
      'Δυνατή. Σύνθετη. Απεριόριστη. Βελγικό tripel από δίσκο προσέγγισης.',
    beerWhiteDwarfNote:
      'Ελαφριά. Φρουτώδης. Αφιλτράριστη. Weizen που ακτινοβολεί σαν λευκός νάνος.',
    beerDarkEnergyNote:
      'Η δύναμη που επιταχύνει το σύμπαν — αιχμαλωτισμένη σε κάθε γουλιά.',
  },
}

export function t(key: string): string {
  return translations[currentLocale][key] ?? translations.en[key] ?? key
}
