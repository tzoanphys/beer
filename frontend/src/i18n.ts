export const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'de', label: 'Deutsch' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'pl', label: 'Polski' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'ru', label: 'Русский' },
] as const

export type Locale = (typeof languages)[number]['code']

const STORAGE_KEY = 'nebula-locale'

let currentLocale: Locale = 'en'
const listeners = new Set<() => void>()

export function getLocale(): Locale {
  return currentLocale
}

export function isValidLocale(code: string): code is Locale {
  return languages.some((l) => l.code === code)
}

export function setLocale(locale: Locale): void {
  if (!isValidLocale(locale)) return
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
    navVideo: 'Video',
    navConnection: 'Connection',
    language: 'Language',
    footer: '© Sta&Kac Science Brewery — Belgium',
    homeEyebrow: 'Sta&Kac Science Brewery — Belgium',
    homeWelcome: 'Welcome to our Brewery',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Science-inspired Belgian craft beer — brewed by physicists, for everyone who loves science.',
    homeLead:
      'Explore our physics-themed collection, brewing advice, and the story behind every pour.',
    homeCtaCollection: 'Explore Collection',
    homeCtaMission: 'Who We Are',
    homeFeaturedTitle: 'Featured Brews',
    homeFeaturedCta: 'See full collection',
    aboutEyebrow: 'Our Story',
    aboutTitle: 'Who We Are',
    aboutIntro:
      'Hello! We are two physicists, Aliaksei and Gianna, and we have worked as postdoctoral researchers at the Université Libre de Bruxelles. We studied theoretical, particle physics, and cosmology. We have started an idea to create our own browsery for people who love science and physics.',
    aboutSite:
      'On this site you will find our products, advice, and discussions.',
    aboutSocial: 'Feel free to follow us on social media!',
    aboutPhotoCaption: 'Aliaksei & Gianna — Sta&Kac Science Brewery',
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
    videoEyebrow: 'Media Lab',
    videoTitle: 'Video',
    videoLead:
      'Brewing experiments, science talks, and behind-the-scenes moments from Sta&Kac.',
    videoComingSoon: 'New videos are on the way. Check back soon.',
    connectionEyebrow: 'Get in Touch',
    connectionTitle: 'Connection',
    connectionLead:
      'Reach out, follow our journey, and join the Sta&Kac community.',
    connectionText:
      'We would love to hear from you — whether about our beers, science, or collaboration ideas.',
  },
  fr: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navigation',
    navFooter: 'Station de brassage orbitale — Secteur 7G',
    navHome: 'Accueil',
    navWho: 'Qui sommes-nous',
    navCollection: 'Notre collection',
    navScience: 'En savoir plus sur la bière',
    navVideo: 'Vidéo',
    navConnection: 'Connexion',
    language: 'Langue',
    footer: '© 2847 Sta&Kac Science Brewery — Division brasserie scientifique',
    homeEyebrow: 'Sta&Kac Science Brewery — Belgique',
    homeWelcome: 'Bienvenue dans notre brasserie',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Bière artisanale belge inspirée par la science — brassée par des physiciens, pour tous les amoureux de la science.',
    homeLead:
      'Découvrez notre collection, nos conseils de brassage et l\'histoire derrière chaque bière.',
    homeCtaCollection: 'Découvrir la collection',
    homeCtaMission: 'Qui sommes-nous',
    homeFeaturedTitle: 'Bières à la une',
    homeFeaturedCta: 'Voir toute la collection',
    aboutEyebrow: 'Notre histoire',
    aboutTitle: 'Qui sommes-nous',
    aboutIntro:
      'Bonjour ! Nous sommes deux physiciens, Aliaksei et Gianna. Nous avons travaillé comme chercheurs postdoctoraux à l\'Université Libre de Bruxelles, où nous avons étudié la physique des particules théorique et la cosmologie. Nous avons eu l\'idée de créer notre propre brasserie pour les personnes qui aiment la science et la physique.',
    aboutSite:
      'Sur ce site, vous trouverez nos produits, nos conseils et nos discussions.',
    aboutSocial: 'N\'hésitez pas à nous suivre sur les réseaux sociaux.',
    aboutPhotoCaption: 'Aliaksei & Gianna — Sta&Kac Science Brewery',
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
    videoEyebrow: 'Labo média',
    videoTitle: 'Vidéo',
    videoLead:
      'Expériences de brassage, conférences scientifiques et coulisses de Sta&Kac.',
    videoComingSoon: 'De nouvelles vidéos arrivent bientôt. Revenez nous voir.',
    connectionEyebrow: 'Contact',
    connectionTitle: 'Connexion',
    connectionLead:
      'Contactez-nous, suivez notre aventure et rejoignez la communauté Sta&Kac.',
    connectionText:
      'Nous serions ravis d\'échanger avec vous — sur nos bières, la science ou des idées de collaboration.',
  },
  nl: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navigatie',
    navFooter: 'Orbitale brouwstation — Sector 7G',
    navHome: 'Home',
    navWho: 'Over ons',
    navCollection: 'Onze collectie',
    navScience: 'Meer over bier',
    navVideo: 'Video',
    navConnection: 'Contact',
    language: 'Taal',
    footer: '© 2847 Sta&Kac Science Brewery — Wetenschappelijke brouwerij',
    homeEyebrow: 'Sta&Kac Science Brewery — België',
    homeWelcome: 'Welkom in onze brouwerij',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Wetenschapsgeïnspireerd Belgisch ambachtsbier — gebrouwen door natuurkundigen, voor iedereen die van wetenschap houdt.',
    homeLead:
      'Ontdek onze collectie, brouwadvies en het verhaal achter elke pour.',
    homeCtaCollection: 'Collectie verkennen',
    homeCtaMission: 'Over ons',
    homeFeaturedTitle: 'Uitgelichte bieren',
    homeFeaturedCta: 'Volledige collectie',
    aboutEyebrow: 'Ons verhaal',
    aboutTitle: 'Over ons',
    aboutIntro:
      'Hallo! Wij zijn twee natuurkundigen, Aliaksei en Gianna. We werkten als postdoctorale onderzoekers aan de Université Libre de Bruxelles, waar we theoretische deeltjesfysica en kosmologie bestudeerden. We kregen het idee om onze eigen brouwerij te starten voor mensen die van wetenschap en natuurkunde houden.',
    aboutSite:
      'Op deze site vind je onze producten, advies en discussies.',
    aboutSocial: 'Volg ons gerust op sociale media.',
    aboutPhotoCaption: 'Aliaksei & Gianna — Sta&Kac Science Brewery',
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
    videoEyebrow: 'Medialab',
    videoTitle: 'Video',
    videoLead:
      'Brouwexperimenten, wetenschapsgesprekken en kijkjes achter de schermen bij Sta&Kac.',
    videoComingSoon: 'Nieuwe video\'s komen binnenkort. Kom later terug.',
    connectionEyebrow: 'Contact',
    connectionTitle: 'Contact',
    connectionLead:
      'Neem contact op, volg onze reis en word deel van de Sta&Kac-gemeenschap.',
    connectionText:
      'We horen graag van je — over onze bieren, wetenschap of samenwerkingsideeën.',
  },
  de: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navigation',
    navFooter: 'Orbitale Brauerei — Sektor 7G',
    navHome: 'Startseite',
    navWho: 'Über uns',
    navCollection: 'Unsere Kollektion',
    navScience: 'Mehr über Bier',
    navVideo: 'Video',
    navConnection: 'Kontakt',
    language: 'Sprache',
    footer: '© 2847 Sta&Kac Science Brewery — Wissenschaftliche Brauerei',
    homeEyebrow: 'Sta&Kac Science Brewery — Belgien',
    homeWelcome: 'Willkommen in unserer Brauerei',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Wissenschaftlich inspiriertes belgisches Craft-Bier — gebraut von Physikern für alle, die Wissenschaft lieben.',
    homeLead:
      'Entdecken Sie unsere Kollektion, Brauertipps und die Geschichte hinter jedem Schluck.',
    homeCtaCollection: 'Kollektion entdecken',
    homeCtaMission: 'Über uns',
    homeFeaturedTitle: 'Empfohlene Biere',
    homeFeaturedCta: 'Gesamte Kollektion',
    aboutEyebrow: 'Unsere Geschichte',
    aboutTitle: 'Über uns',
    aboutIntro:
      'Hallo! Wir sind zwei Physiker, Aliaksei und Gianna. Wir arbeiteten als Postdoktoranden an der Université Libre de Bruxelles, wo wir theoretische Teilchenphysik und Kosmologie studierten. Wir hatten die Idee, unsere eigene Brauerei für Menschen zu gründen, die Wissenschaft und Physik lieben.',
    aboutSite:
      'Auf dieser Website finden Sie unsere Produkte, Ratschläge und Diskussionen.',
    aboutSocial: 'Folgen Sie uns gerne in den sozialen Medien.',
    aboutPhotoCaption: 'Aliaksei & Gianna — Sta&Kac Science Brewery',
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
    videoEyebrow: 'Medienlabor',
    videoTitle: 'Video',
    videoLead:
      'Brau-Experimente, Wissenschaftsvorträge und Einblicke hinter die Kulissen von Sta&Kac.',
    videoComingSoon: 'Neue Videos folgen in Kürze. Schauen Sie bald wieder vorbei.',
    connectionEyebrow: 'Kontakt',
    connectionTitle: 'Kontakt',
    connectionLead:
      'Melden Sie sich, folgen Sie unserer Reise und werden Sie Teil der Sta&Kac-Community.',
    connectionText:
      'Wir freuen uns über Ihre Nachricht — zu unseren Bieren, Wissenschaft oder Kooperationsideen.',
  },
  el: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Πλοήγηση',
    navFooter: 'Ορβital ζυθοποιείο — Τομέας 7G',
    navHome: 'Αρχική',
    navWho: 'Ποιοι είμαστε',
    navCollection: 'Η συλλογή μας',
    navScience: 'Περισσότερα για τη μπύρα',
    navVideo: 'Βίντεο',
    navConnection: 'Επικοινωνία',
    language: 'Γλώσσα',
    footer: '© 2847 Sta&Kac Science Brewery — Επιστημονική ζυθοποιία',
    homeEyebrow: 'Sta&Kac Science Brewery — Βέλγιο',
    homeWelcome: 'Καλώς ήρθατε στη ζυθοποιία μας',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Βελγική μπύρα εμπνευσμένη από την επιστήμη — από φυσικούς, για όσους αγαπούν την επιστήμη.',
    homeLead:
      'Εξερευνήστε τη συλλογή μας, συμβουλές ζυθοποιίας και την ιστορία πίσω από κάθε poor.',
    homeCtaCollection: 'Εξερεύνηση συλλογής',
    homeCtaMission: 'Ποιοι είμαστε',
    homeFeaturedTitle: 'Προτεινόμενες μπύρες',
    homeFeaturedCta: 'Πλήρης συλλογή',
    aboutEyebrow: 'Η ιστορία μας',
    aboutTitle: 'Ποιοι είμαστε',
    aboutIntro:
      'Γεια σας! Είμαστε δύο φυσικοί, ο Aliaksei και η Gianna. Εργαστήκαμε ως μεταδιδακτορικοί ερευνητές στο Université Libre de Bruxelles, όπου μελετήσαμε θεωρητική φυσική σωματιδίων και κοσμολογία. Η ιδέα μας ήταν να δημιουργήσουμε τη δική μας ζυθοποιία για ανθρώπους που αγαπούν την επιστήμη και τη φυσική.',
    aboutSite:
      'Σε αυτόν τον ιστότοπο θα βρείτε τα προϊόντα μας, συμβουλές και συζητήσεις.',
    aboutSocial: 'Μη διστάσετε να μας ακολουθήσετε στα social media.',
    aboutPhotoCaption: 'Aliaksei & Gianna — Sta&Kac Science Brewery',
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
    videoEyebrow: 'Μέσα εργαστήριο',
    videoTitle: 'Βίντεο',
    videoLead:
      'Πειράματα ζυθοποιίας, επιστημονικές ομιλίες και στιγμές από τα παρασκήνια του Sta&Kac.',
    videoComingSoon: 'Νέα βίντεο έρχονται σύντομα. Επιστρέψτε σύντομα.',
    connectionEyebrow: 'Επικοινωνία',
    connectionTitle: 'Επικοινωνία',
    connectionLead:
      'Επικοινωνήστε μαζί μας, ακολουθήστε το ταξίδι μας και γίνετε μέλος της κοινότητας Sta&Kac.',
    connectionText:
      'Θα χαρούμε να ακούσουμε από εσάς — για τις μπύρες μας, την επιστήμη ή ιδέες συνεργασίας.',
  },
  pl: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Nawigacja',
    navFooter: 'Sta&Kac Science Brewery — Belgia',
    navHome: 'Strona główna',
    navWho: 'Kim jesteśmy',
    navCollection: 'Nasza kolekcja',
    navScience: 'Więcej o piwie',
    navVideo: 'Wideo',
    navConnection: 'Kontakt',
    language: 'Język',
    footer: '© Sta&Kac Science Brewery — Belgia',
    homeEyebrow: 'Sta&Kac Science Brewery — Belgia',
    homeWelcome: 'Witamy w naszym browarze',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Belgijskie piwo rzemieślnicze inspirowane nauką — warzone przez fizyków dla wszystkich, którzy kochają naukę.',
    homeLead:
      'Odkryj naszą kolekcję, porady browarniane i historię każdego nalewania.',
    homeCtaCollection: 'Zobacz kolekcję',
    homeCtaMission: 'Kim jesteśmy',
    homeFeaturedTitle: 'Polecane piwa',
    homeFeaturedCta: 'Pełna kolekcja',
    aboutEyebrow: 'Nasza historia',
    aboutTitle: 'Kim jesteśmy',
    aboutIntro:
      'Cześć! Jesteśmy dwójką fizyków, Aliaksei i Gianna. Pracowaliśmy jako badacze postdoktoranci na Université Libre de Bruxelles. Studiowaliśmy fizykę teoretyczną, fizykę cząstek elementarnych i kosmologię. Wpadliśmy na pomysł stworzenia własnego browaru dla osób, które kochają naukę i fizykę.',
    aboutSite:
      'Na tej stronie znajdziesz nasze produkty, porady i dyskusje.',
    aboutSocial: 'Zapraszamy do obserwowania nas w mediach społecznościowych!',
    aboutPhotoCaption: 'Aliaksei i Gianna — Sta&Kac Science Brewery',
    collectionEyebrow: 'Katalog okazów',
    collectionTitle: 'Nasza kolekcja',
    collectionLead:
      'Sześć flagowych piw inspirowanych fizyką. Każda etykieta to pojęcie naukowe — każde nalewanie to eksperyment.',
    specimen: 'Okaz',
    scienceEyebrow: 'Dział badań',
    scienceTitle: 'Więcej o piwie',
    scienceLead:
      'Nauka stojąca za nalewaniem. Zrozumienie fermentacji na poziomie molekularnym zamienia dobre piwo w coś wyjątkowego.',
    step1Title: 'Słód i zacieranie',
    step1Text:
      'Enzymy przekształcają skrobię w cukry fermentujące. Monitorujemy temperatury saccharification rest z dokładnością do 0,1 °C — różnica między dobrym a transcendentalnym.',
    step2Title: 'Chemia chmielu',
    step2Text:
      'Kwasy alfa izomeryzują się podczas gotowania, tworząc gorycz. Chmiel dodany późno zachowuje lotne terpeny — mircen, humulen, linalol.',
    step3Title: 'Fermentacja drożdżowa',
    step3Text:
      'Saccharomyces cerevisiae zużywa cukry, produkując etanol i estry. Nasze laboratorium utrzymuje 47 własnych szczepów drożdży, każdy skatalogowany genomowo.',
    step4Title: 'Dojrzewanie i karbonizacja',
    step4Text:
      'Dojrzewanie po fermentacji pozwala smakom się zintegrować. Karbonizujemy z precyzją — dokładne objętości CO₂ dla idealnej konsystencji.',
    formulaLabel: 'Równanie fermentacji',
    formulaCaption:
      'Glukoza przekształcona w etanol, dwutlenek węgla i energię — która napędza życie i świetne piwo.',
    beerSchrodingerNote:
      'Edycja Superpozycji — dwa stany współistnieją do otwarcia butelki. Mętne IPA i suche IPA w kwantowej harmonii.',
    beerDarkMatterNote:
      'Głębokie. Tajemnicze. Niepowstrzymane. Amber ale wirujące na krawędzi horyzontu zdarzeń.',
    beerBottomQuarkNote:
      'Subatomowa precyzja. Chmiel z wymianą gluonów, profil fermentacji jak diagram Feynmana.',
    beerSupergravityNote:
      'Potężne. Złożone. Bezkresne. Belgijskie tripel z dysku akrecyjnego czarnej dziury.',
    beerWhiteDwarfNote:
      'Lekkie. Owocowe. Niefiltrowane. Weizen promieniujące blaskiem umierającej gwiazdy.',
    beerDarkEnergyNote:
      'Siła przyspieszająca wszechświat — uwięziona w każdym nalewaniu.',
    videoEyebrow: 'Laboratorium mediów',
    videoTitle: 'Wideo',
    videoLead:
      'Eksperymenty browarniane, wykłady naukowe i kulisy Sta&Kac.',
    videoComingSoon: 'Nowe filmy już w drodze. Wróć wkrótce.',
    connectionEyebrow: 'Kontakt',
    connectionTitle: 'Kontakt',
    connectionLead:
      'Skontaktuj się z nami, śledź naszą podróż i dołącz do społeczności Sta&Kac.',
    connectionText:
      'Chętnie usłyszymy od Ciebie — o naszych piwach, nauce lub pomysłach na współpracę.',
  },
  ru: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Навигация',
    navFooter: 'Sta&Kac Science Brewery — Бельгия',
    navHome: 'Главная',
    navWho: 'О нас',
    navCollection: 'Наша коллекция',
    navScience: 'Больше о пиве',
    navVideo: 'Видео',
    navConnection: 'Связь',
    language: 'Язык',
    footer: '© Sta&Kac Science Brewery — Бельгия',
    homeEyebrow: 'Sta&Kac Science Brewery — Бельгия',
    homeWelcome: 'Добро пожаловать в нашу пивоварню',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Бельгийское крафтовое пиво, вдохновлённое наукой — от физиков для всех, кто любит науку.',
    homeLead:
      'Изучите нашу коллекцию, советы по пивоварению и историю каждого бокала.',
    homeCtaCollection: 'Смотреть коллекцию',
    homeCtaMission: 'О нас',
    homeFeaturedTitle: 'Избранные сорта',
    homeFeaturedCta: 'Вся коллекция',
    aboutEyebrow: 'Наша история',
    aboutTitle: 'О нас',
    aboutIntro:
      'Привет! Мы двое физиков, Алексей и Джанна. Мы работали постдоками в Université Libre de Bruxelles. Мы изучали теоретическую физику, физику частиц и космологию. У нас появилась идея создать собственную пивоварню для людей, которые любят науку и физику.',
    aboutSite:
      'На этом сайте вы найдёте наши продукты, советы и обсуждения.',
    aboutSocial: 'Подписывайтесь на нас в социальных сетях!',
    aboutPhotoCaption: 'Алексей и Джанна — Sta&Kac Science Brewery',
    collectionEyebrow: 'Каталог образцов',
    collectionTitle: 'Наша коллекция',
    collectionLead:
      'Шесть флагманских сортов, вдохновлённых физикой. Каждая этикетка — научная концепция, каждый бокал — эксперимент.',
    specimen: 'Образец',
    scienceEyebrow: 'Исследовательский отдел',
    scienceTitle: 'Больше о пиве',
    scienceLead:
      'Наука за каждым бокалом. Понимание брожения на молекулярном уровне превращает хорошее пиво во что-то необыкновенное.',
    step1Title: 'Солод и затирание',
    step1Text:
      'Ферменты превращают крахмал в сахара для брожения. Мы контролируем температуру saccharification rest с точностью до 0,1 °C — разница между хорошим и выдающимся.',
    step2Title: 'Химия хмеля',
    step2Text:
      'Альфа-кислоты изомеризуются при кипении, создавая горечь. Позднее добавление хмеля сохраняет летучие терпены — мирцен, гумулен, линалоол.',
    step3Title: 'Дрожжевое брожение',
    step3Text:
      'Saccharomyces cerevisiae потребляет сахара, производя этанол и эфиры. В нашей лаборатории 47 собственных штаммов дрожжей, каждый каталогизирован по геному.',
    step4Title: 'Выдержка и карбонизация',
    step4Text:
      'Послеброженная выдержка позволяет вкусам объединиться. Мы карбонизируем с точностью — точные объёмы CO₂ для идеальной текстуры.',
    formulaLabel: 'Уравнение брожения',
    formulaCaption:
      'Глюкоза превращается в этанол, углекислый газ и энергию — которая питает жизнь и отличное пиво.',
    beerSchrodingerNote:
      'Издание Superposition — два состояния сосуществуют до открытия бутылки. Мутное IPA и сухое IPA в квантовой гармонии.',
    beerDarkMatterNote:
      'Глубокое. Загадочное. Неостановимое. Amber ale на краю горизонта событий.',
    beerBottomQuarkNote:
      'Субатомная точность. Хмель с обменом глюонами, профиль брожения как диаграмма Фейнмана.',
    beerSupergravityNote:
      'Мощное. Сложное. Безграничное. Бельгийский tripel с аккреционного диска.',
    beerWhiteDwarfNote:
      'Лёгкое. Фруктовое. Нефильтрованное. Weizen, сияющий как белый карлик.',
    beerDarkEnergyNote:
      'Сила, ускоряющая Вселенную — запечатлённая в каждом бокале.',
    videoEyebrow: 'Медиалаборатория',
    videoTitle: 'Видео',
    videoLead:
      'Пивоваренные эксперименты, научные лекции и закулисье Sta&Kac.',
    videoComingSoon: 'Новые видео скоро появятся. Загляните позже.',
    connectionEyebrow: 'Связаться',
    connectionTitle: 'Связь',
    connectionLead:
      'Напишите нам, следите за нашим путём и присоединяйтесь к сообществу Sta&Kac.',
    connectionText:
      'Мы будем рады услышать вас — о нашем пиве, науке или идеях сотрудничества.',
  },
  es: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navegación',
    navFooter: 'Sta&Kac Science Brewery — Bélgica',
    navHome: 'Inicio',
    navWho: 'Quiénes somos',
    navCollection: 'Nuestra colección',
    navScience: 'Más sobre la cerveza',
    navVideo: 'Vídeo',
    navConnection: 'Contacto',
    language: 'Idioma',
    footer: '© Sta&Kac Science Brewery — Bélgica',
    homeEyebrow: 'Sta&Kac Science Brewery — Bélgica',
    homeWelcome: 'Bienvenidos a nuestra cervecería',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Cerveza artesanal belga inspirada en la ciencia — elaborada por físicos para quienes aman la ciencia.',
    homeLead:
      'Explora nuestra colección, consejos de elaboración y la historia detrás de cada servicio.',
    homeCtaCollection: 'Explorar colección',
    homeCtaMission: 'Quiénes somos',
    homeFeaturedTitle: 'Cervezas destacadas',
    homeFeaturedCta: 'Ver colección completa',
    aboutEyebrow: 'Nuestra historia',
    aboutTitle: 'Quiénes somos',
    aboutIntro:
      '¡Hola! Somos dos físicos, Aliaksei y Gianna. Trabajamos como investigadores postdoctorales en la Université Libre de Bruxelles. Estudiamos física teórica, física de partículas y cosmología. Tuvimos la idea de crear nuestra propia cervecería para personas que aman la ciencia y la física.',
    aboutSite:
      'En este sitio encontrarás nuestros productos, consejos y debates.',
    aboutSocial: '¡Síguenos en las redes sociales!',
    aboutPhotoCaption: 'Aliaksei y Gianna — Sta&Kac Science Brewery',
    collectionEyebrow: 'Catálogo de especímenes',
    collectionTitle: 'Nuestra colección',
    collectionLead:
      'Seis cervezas emblemáticas inspiradas en la física. Cada etiqueta es un concepto científico — cada servicio, un experimento.',
    specimen: 'Especimen',
    scienceEyebrow: 'División de investigación',
    scienceTitle: 'Más sobre la cerveza',
    scienceLead:
      'La ciencia detrás del servicio. Comprender la fermentación a nivel molecular transforma una buena cerveza en algo extraordinario.',
    step1Title: 'Malta y maceración',
    step1Text:
      'Las enzimas convierten almidones en azúcares fermentables. Monitorizamos las temperaturas de reposo de sacarificación con una precisión de 0,1 °C.',
    step2Title: 'Química del lúpulo',
    step2Text:
      'Los ácidos alfa se isomerizan durante la ebullición, creando amargor. Los lúpulos añadidos tarde preservan terpenos volátiles — mirceno, humuleno, linalool.',
    step3Title: 'Fermentación con levadura',
    step3Text:
      'Saccharomyces cerevisiae consume azúcares, produciendo etanol y ésteres. Nuestro laboratorio mantiene 47 cepas propias, catalogadas genómicamente.',
    step4Title: 'Maduración y carbonatación',
    step4Text:
      'La maduración post-fermentación permite integrar sabores. Carbonatamos con precisión — volúmenes exactos de CO₂ para la textura perfecta.',
    formulaLabel: 'Ecuación de fermentación',
    formulaCaption:
      'Glucosa transformada en etanol, dióxido de carbono y energía — que impulsa la vida y una gran cerveza.',
    beerSchrodingerNote:
      'Edición Superposición — dos estados coexisten hasta abrir la botella. IPA turbia e IPA seca en armonía cuántica.',
    beerDarkMatterNote:
      'Profunda. Misteriosa. Imparable. Amber ale en el borde de un horizonte de sucesos.',
    beerBottomQuarkNote:
      'Precisión subatómica. Lúpulo de intercambio de gluones, perfil de fermentación tipo diagrama de Feynman.',
    beerSupergravityNote:
      'Potente. Compleja. Ilimitada. Tripel belga de un disco de acreción.',
    beerWhiteDwarfNote:
      'Ligera. Afrutada. Sin filtrar. Weizen que brilla como una enana blanca.',
    beerDarkEnergyNote:
      'La fuerza que acelera el universo — capturada en cada servicio.',
    videoEyebrow: 'Laboratorio de medios',
    videoTitle: 'Vídeo',
    videoLead:
      'Experimentos de elaboración, charlas científicas y momentos entre bastidores de Sta&Kac.',
    videoComingSoon: 'Pronto habrá nuevos vídeos. Vuelve pronto.',
    connectionEyebrow: 'Contacto',
    connectionTitle: 'Contacto',
    connectionLead:
      'Escríbenos, sigue nuestro camino y únete a la comunidad Sta&Kac.',
    connectionText:
      'Nos encantaría saber de ti — sobre nuestras cervezas, la ciencia o ideas de colaboración.',
  },
  it: {
    brand: 'Sta&Kac Science Brewery',
    navTitle: 'Navigazione',
    navFooter: 'Sta&Kac Science Brewery — Belgio',
    navHome: 'Home',
    navWho: 'Chi siamo',
    navCollection: 'La nostra collezione',
    navScience: 'Più sulla birra',
    navVideo: 'Video',
    navConnection: 'Contatti',
    language: 'Lingua',
    footer: '© Sta&Kac Science Brewery — Belgio',
    homeEyebrow: 'Sta&Kac Science Brewery — Belgio',
    homeWelcome: 'Benvenuti nel nostro birrificio',
    homeTitle: 'Sta&Kac',
    homeTagline:
      'Birra artigianale belga ispirata alla scienza — prodotta da fisici per chi ama la scienza.',
    homeLead:
      'Esplora la nostra collezione, consigli di produzione e la storia dietro ogni bicchiere.',
    homeCtaCollection: 'Esplora collezione',
    homeCtaMission: 'Chi siamo',
    homeFeaturedTitle: 'Birre in evidenza',
    homeFeaturedCta: 'Collezione completa',
    aboutEyebrow: 'La nostra storia',
    aboutTitle: 'Chi siamo',
    aboutIntro:
      'Ciao! Siamo due fisici, Aliaksei e Gianna. Abbiamo lavorato come ricercatori postdottorandi all\'Université Libre de Bruxelles. Abbiamo studiato fisica teorica, fisica delle particelle e cosmologia. Abbiamo avuto l\'idea di creare il nostro birrificio per chi ama la scienza e la fisica.',
    aboutSite:
      'Su questo sito troverai i nostri prodotti, consigli e discussioni.',
    aboutSocial: 'Seguici liberamente sui social media!',
    aboutPhotoCaption: 'Aliaksei e Gianna — Sta&Kac Science Brewery',
    collectionEyebrow: 'Catalogo campioni',
    collectionTitle: 'La nostra collezione',
    collectionLead:
      'Sei birre iconiche ispirate alla fisica. Ogni etichetta è un concetto scientifico — ogni bicchiere, un esperimento.',
    specimen: 'Campione',
    scienceEyebrow: 'Divisione ricerca',
    scienceTitle: 'Più sulla birra',
    scienceLead:
      'La scienza dietro ogni bicchiere. Capire la fermentazione a livello molecolare trasforma una buona birra in qualcosa di straordinario.',
    step1Title: 'Malto e ammostamento',
    step1Text:
      'Gli enzimi convertono gli amidi in zuccheri fermentabili. Monitoriamo le temperature di saccharification rest con precisione di 0,1 °C.',
    step2Title: 'Chimica del luppolo',
    step2Text:
      'Gli acidi alfa si isomerizzano durante la bollitura, creando amaro. I luppoli aggiunti tardi preservano terpeni volatili — mircene, umulene, linalolo.',
    step3Title: 'Fermentazione del lievito',
    step3Text:
      'Saccharomyces cerevisiae consuma zuccheri, producendo etanolo ed esteri. Il nostro laboratorio mantiene 47 ceppi proprietari, catalogati genomicamente.',
    step4Title: 'Maturazione e carbonatazione',
    step4Text:
      'La maturazione post-fermentazione permette ai sapori di integrarsi. Carbonatiamo con precisione — volumi esatti di CO₂ per la consistenza perfetta.',
    formulaLabel: 'Equazione di fermentazione',
    formulaCaption:
      'Glucosio trasformato in etanolo, anidride carbonica ed energia — che alimenta la vita e una grande birra.',
    beerSchrodingerNote:
      'Edizione Superposizione — due stati coexistono fino all\'apertura. IPA torbida e IPA secca in armonia quantistica.',
    beerDarkMatterNote:
      'Profonda. Misteriosa. Inarrestabile. Amber ale sul bordo di un orizzonte degli eventi.',
    beerBottomQuarkNote:
      'Precisione subatomica. Luppolo a scambio di gluoni, profilo di fermentazione da diagramma di Feynman.',
    beerSupergravityNote:
      'Potente. Complessa. Illimitata. Tripel belga da un disco di accrezione.',
    beerWhiteDwarfNote:
      'Leggera. Fruttata. Non filtrata. Weizen che brilla come una nana bianca.',
    beerDarkEnergyNote:
      'La forza che accelera l\'universo — catturata in ogni bicchiere.',
    videoEyebrow: 'Laboratorio media',
    videoTitle: 'Video',
    videoLead:
      'Esperimenti di birra, talk scientifici e momenti dietro le quinte di Sta&Kac.',
    videoComingSoon: 'Nuovi video in arrivo. Torna presto.',
    connectionEyebrow: 'Contatti',
    connectionTitle: 'Contatti',
    connectionLead:
      'Contattaci, segui il nostro percorso e unisciti alla community Sta&Kac.',
    connectionText:
      'Ci farebbe piacere sentirti — sulle nostre birre, la scienza o idee di collaborazione.',
  },
}

export function t(key: string): string {
  return translations[currentLocale][key] ?? translations.en[key] ?? key
}
