import type { Metadata } from "next";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL } from "@/src/lib/seo";
import { Sparkles, ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "108 Names of Devi | Ashtottara Shatanamavali",
  description:
    "Read and chant the 108 sacred names of the Divine Mother (Devi Ashtottara Shatanamavali). Experience spiritual bliss and devotion.",
  alternates: { canonical: "/108-names" },
  openGraph: {
    type: "website",
    title: "108 Names of Devi - Mahalaxmi Temple",
    description: "The sacred Namavali of the Divine Mother.",
    url: `${SITE_URL}/108-names`,
  },
};

const names = [
  {
    "sanskrit": "ॐ महा लक्ष्मी नमः",
    "transliteration": "Oṃ mahā lakṣmī namaḥ",
    "meaning": "Glory to Mahā Lakṣmī"
  },
  {
    "sanskrit": "ॐ ईश्वरी नमः",
    "transliteration": "Oṃ īśvarī namaḥ",
    "meaning": "Glory to the Goddess"
  },
  {
    "sanskrit": "ॐ कमला नमः",
    "transliteration": "Oṃ kamalā namaḥ",
    "meaning": "Glory to the lotus [-like] (Lakṣmī)"
  },
  {
    "sanskrit": "ॐ छाला नमः",
    "transliteration": "Oṃ chālā namaḥ",
    "meaning": "Glory to the moving (shaking, stirring) One"
  },
  {
    "sanskrit": "ॐ भूती नमः",
    "transliteration": "Oṃ bhūtī namaḥ",
    "meaning": "Glory to Existence"
  },
  {
    "sanskrit": "ॐ हरिप्रिया नमः",
    "transliteration": "Oṃ hari-priyā namaḥ",
    "meaning": "Glory to the One who is dear to Viṣṇu"
  },
  {
    "sanskrit": "ॐ पद्मा नमः",
    "transliteration": "Oṃ padmā namaḥ",
    "meaning": "Glory to the lotus [-like] (Lakṣmī)"
  },
  {
    "sanskrit": "ॐ पद्मालया नमः",
    "transliteration": "Oṃ padmā-layā namaḥ",
    "meaning": "Glory to the lotus-dweller"
  },
  {
    "sanskrit": "ॐ सम्पत् नमः",
    "transliteration": "Oṃ sampat namaḥ",
    "meaning": "Glory to the One who is prosperity"
  },
  {
    "sanskrit": "ॐ उच्छैः नमः",
    "transliteration": "Oṃ ucchaiḥ namaḥ",
    "meaning": "Glory to the haughty/intense One"
  },
  {
    "sanskrit": "ॐ श्री नमः",
    "transliteration": "Oṃ śrī namaḥ",
    "meaning": "Glory to the auspicious One (Lakṣmī)"
  },
  {
    "sanskrit": "ॐ पद्माधारिनी नमः",
    "transliteration": "Oṃ padmā-dhārinī namaḥ",
    "meaning": "Glory to the lotus-wearer"
  },
  {
    "sanskrit": "ॐ दुर्गा नमः",
    "transliteration": "Oṃ durgā namaḥ",
    "meaning": "Glory to Durgā"
  },
  {
    "sanskrit": "ॐ अम्बा नमः",
    "transliteration": "Oṃ ambā namaḥ",
    "meaning": "Glory to Mother"
  },
  {
    "sanskrit": "ॐ गङ्गा नमः",
    "transliteration": "Oṃ gaṅgā namaḥ",
    "meaning": "Glory to Gaṅgā"
  },
  {
    "sanskrit": "ॐ शारदा नमः",
    "transliteration": "Oṃ śāradā namaḥ",
    "meaning": "Glory to Śāradā (who represents knowledge and joy)"
  },
  {
    "sanskrit": "ॐ तारा नमः",
    "transliteration": "Oṃ tārā namaḥ",
    "meaning": "Glory to the liberator"
  },
  {
    "sanskrit": "ॐ उमा नमः",
    "transliteration": "Oṃ umā namaḥ",
    "meaning": "Glory to Umā [lit. ‘One who is Light’]"
  },
  {
    "sanskrit": "ॐ ललिता नमः",
    "transliteration": "Oṃ lalitā namaḥ",
    "meaning": "Glory to the beloved (charming/tender/playful) One"
  },
  {
    "sanskrit": "ॐ राधा नमः",
    "transliteration": "Oṃ rādhā namaḥ",
    "meaning": "Glory to Rādhā [lit. ‘prosperity’, ‘success’]"
  },
  {
    "sanskrit": "ॐ सीता नमः",
    "transliteration": "Oṃ sītā namaḥ",
    "meaning": "Glory to Sītā"
  },
  {
    "sanskrit": "ॐ जगन्माता नमः",
    "transliteration": "Oṃ jagan-mātā namaḥ",
    "meaning": "Glory to the Universal Mother"
  },
  {
    "sanskrit": "ॐ गिरिजा नमः",
    "transliteration": "Oṃ giri-jā namaḥ",
    "meaning": "Glory to the mountain-born"
  },
  {
    "sanskrit": "ॐ श्यामा नमः",
    "transliteration": "Oṃ śyāmā namaḥ",
    "meaning": "Glory to the dark[-coloured] One"
  },
  {
    "sanskrit": "ॐ एकजाता नमः",
    "transliteration": "Oṃ eka-jātā namaḥ",
    "meaning": "Glory to the single creation/origin (‘One and only’)"
  },
  {
    "sanskrit": "ॐ गुरुगुहा नमः",
    "transliteration": "Oṃ guru-guhā namaḥ",
    "meaning": "Glory to the refuge of gurus"
  },
  {
    "sanskrit": "ॐ अन्नपूर्णा नमः",
    "transliteration": "Oṃ anna-pūrṇā namaḥ",
    "meaning": "Glory to the food-filled One"
  },
  {
    "sanskrit": "ॐ नीलसरस्वती नमः",
    "transliteration": "Oṃ nīla-sarasvatī namaḥ",
    "meaning": "Glory to the dark-blue Sarasvatī (a fierce aspect of Tārā)"
  },
  {
    "sanskrit": "ॐ शाकम्भरी नमः",
    "transliteration": "Oṃ śākam-bharī namaḥ",
    "meaning": "Glory to the herb/vegetable nourisher"
  },
  {
    "sanskrit": "ॐ महादेवी नमः",
    "transliteration": "Oṃ mahā-devī namaḥ",
    "meaning": "Glory to the Great Goddess"
  },
  {
    "sanskrit": "ॐ ब्रह्माणी नमः",
    "transliteration": "Oṃ brahmāṇī namaḥ",
    "meaning": "Glory to the female Brahmā (Sarasvatī)"
  },
  {
    "sanskrit": "ॐ रुद्राणी नमः",
    "transliteration": "Oṃ rudrāṇī namaḥ",
    "meaning": "Glory to the female Rudra (Durgā)"
  },
  {
    "sanskrit": "ॐ वैष्णवी नमः",
    "transliteration": "Oṃ vaiṣṇavī namaḥ",
    "meaning": "Glory to the female Viṣṇu (Lakṣmī)"
  },
  {
    "sanskrit": "ॐ नारायणी नमः",
    "transliteration": "Oṃ nārāyaṇī namaḥ",
    "meaning": "Glory to the refuge of mankind"
  },
  {
    "sanskrit": "ॐ मोहिनी नमः",
    "transliteration": "Oṃ mohinī namaḥ",
    "meaning": "Glory to the deceiver (Viṣṇu took a female form to trick demons)"
  },
  {
    "sanskrit": "ॐ ऊर्वशी नमः",
    "transliteration": "Oṃ ūrvaśī namaḥ",
    "meaning": "Glory to the immense One (Personification of the Dawn)"
  },
  {
    "sanskrit": "ॐ वराही नमः",
    "transliteration": "Oṃ varāhī namaḥ",
    "meaning": "Glory to the boar (female Varāha – the 3rd Avatāra of Viṣṇu)"
  },
  {
    "sanskrit": "ॐ सुन्दरी नमः",
    "transliteration": "Oṃ sundarī namaḥ",
    "meaning": "Glory to the beautiful One"
  },
  {
    "sanskrit": "ॐ जननी नमः",
    "transliteration": "Oṃ jananī namaḥ",
    "meaning": "Glory to Mother [lit. ‘birth giver’]"
  },
  {
    "sanskrit": "ॐ नारसिंही नमः",
    "transliteration": "Oṃ nāra-siṃhī namaḥ",
    "meaning": "Glory to the female Nāra-siṃha (Man-lion)"
  },
  {
    "sanskrit": "ॐ हरसिद्धी नमः",
    "transliteration": "Oṃ hara-siddhī namaḥ",
    "meaning": "Glory to the ability of the destroyer (Śiva)"
  },
  {
    "sanskrit": "ॐ महारात्रि नमः",
    "transliteration": "Oṃ mahā-rātri namaḥ",
    "meaning": "Glory to the great-night"
  },
  {
    "sanskrit": "ॐ कालरात्रि नमः",
    "transliteration": "Oṃ kāla-rātri namaḥ",
    "meaning": "Glory to the black-night"
  },
  {
    "sanskrit": "ॐ पद्मावती नमः",
    "transliteration": "Oṃ padmā-vatī namaḥ",
    "meaning": "Glory to the lotus-bearer"
  },
  {
    "sanskrit": "ॐ शिवदूती नमः",
    "transliteration": "Oṃ śiva-dūtī namaḥ",
    "meaning": "Glory to Śiva’s messenger"
  },
  {
    "sanskrit": "ॐ शैलपुत्री नमः",
    "transliteration": "Oṃ śaila-putrī namaḥ",
    "meaning": "Glory to the daughter of the mountain"
  },
  {
    "sanskrit": "ॐ सिंहवाहिनी नमः",
    "transliteration": "Oṃ siṃha-vāhinī namaḥ",
    "meaning": "Glory to the lion-rider"
  },
  {
    "sanskrit": "ॐ विन्ध्यवासिनी नमः",
    "transliteration": "Oṃ vindhya-vāsinī namaḥ",
    "meaning": "Glory to the mountain-dweller"
  },
  {
    "sanskrit": "ॐ माताभवनी नमः",
    "transliteration": "Oṃ mātā-bhavanī namaḥ",
    "meaning": "Glory to the mother of Existence"
  },
  {
    "sanskrit": "ॐ महेश्वरी नमः",
    "transliteration": "Oṃ maheśvarī namaḥ",
    "meaning": "Glory to the Great Goddess"
  },
  {
    "sanskrit": "ॐ शङ्करी नमः",
    "transliteration": "Oṃ śaṅkarī namaḥ",
    "meaning": "Glory to the female Śaṅkara (i.e. Parvatī) [lit. ‘beneficent’]"
  },
  {
    "sanskrit": "ॐ दुर्गेश्वरी नमः",
    "transliteration": "Oṃ durgeśvarī namaḥ",
    "meaning": "Glory to Goddess Durgā [implies overcoming of difficulty]"
  },
  {
    "sanskrit": "ॐ जगदीश्वरी नमः",
    "transliteration": "Oṃ jagad-īśvarī namaḥ",
    "meaning": "Glory to the Universal Goddess"
  },
  {
    "sanskrit": "ॐ भुवनेश्वरी नमः",
    "transliteration": "Oṃ bhuvaneśvarī namaḥ",
    "meaning": "Glory to the Goddess of the earth"
  },
  {
    "sanskrit": "ॐ त्रिपुरसुन्दरी नमः",
    "transliteration": "Oṃ tri-pura-sundarī namaḥ",
    "meaning": "Glory to Tripurasundarī [lit. ‘The Beauty of the Three Citadels’]"
  },
  {
    "sanskrit": "ॐ राजराजेश्वरी नमः",
    "transliteration": "Oṃ rāja-rājeśvarī namaḥ",
    "meaning": "Glory to Rājarājeśvarī [lit. ‘Goddess of the King of Kings’]"
  },
  {
    "sanskrit": "ॐ परमेश्वरी नमः",
    "transliteration": "Oṃ parameśvarī namaḥ",
    "meaning": "Glory to the Supreme Goddess"
  },
  {
    "sanskrit": "ॐ सुरेश्वरी नमः",
    "transliteration": "Oṃ sureśvarī namaḥ",
    "meaning": "Glory to the Goddess of the Gods"
  },
  {
    "sanskrit": "ॐ सिद्धेश्वरी नमः",
    "transliteration": "Oṃ siddheśvarī namaḥ",
    "meaning": "Glory to the Goddess of accomplishment"
  },
  {
    "sanskrit": "ॐ सर्वेश्वरी नमः",
    "transliteration": "Oṃ sarveśvarī namaḥ",
    "meaning": "Glory to the Goddess of all"
  },
  {
    "sanskrit": "ॐ कामेश्वरी नमः",
    "transliteration": "Oṃ kāmeśvarī namaḥ",
    "meaning": "Glory to the Goddess of desire"
  },
  {
    "sanskrit": "ॐ कमलेश्वरी नमः",
    "transliteration": "Oṃ kamaleśvarī namaḥ",
    "meaning": "Glory to the Goddess of the lotus"
  },
  {
    "sanskrit": "ॐ अखिलाण्डेश्वरी नमः",
    "transliteration": "Oṃ akhilāṇḍeśvarī namaḥ",
    "meaning": "Glory to the Goddess-ruler of the Universe"
  },
  {
    "sanskrit": "ॐ शशीशेखरी नमः",
    "transliteration": "Oṃ śaśī-śekharī namaḥ",
    "meaning": "Glory to the One who wears the Moon as a diadem"
  },
  {
    "sanskrit": "ॐ भयङ्करी नमः",
    "transliteration": "Oṃ bhayaṅkarī namaḥ",
    "meaning": "Glory to the One who instills fear"
  },
  {
    "sanskrit": "ॐ देवीकुण्डलिनी नमः",
    "transliteration": "Oṃ devī-kuṇḍalinī namaḥ",
    "meaning": "Glory to the ‘serpentine power’ of the Goddess"
  },
  {
    "sanskrit": "ॐ सत्यस्वरूपिनी नमः",
    "transliteration": "Oṃ satya-svarūpinī namaḥ",
    "meaning": "Glory to the One whose own nature is Truth"
  },
  {
    "sanskrit": "ॐ प्रेमप्रदायिनी नमः",
    "transliteration": "Oṃ prema-pradāyinī namaḥ",
    "meaning": "Glory to the giver of love"
  },
  {
    "sanskrit": "ॐ आनन्ददायिनी नमः",
    "transliteration": "Oṃ ānanda-dāyinī namaḥ",
    "meaning": "Glory to the giver of bliss"
  },
  {
    "sanskrit": "ॐ पालिनी नमः",
    "transliteration": "Oṃ pālinī namaḥ",
    "meaning": "Glory to the protector"
  },
  {
    "sanskrit": "ॐ पट्टिनी नमः",
    "transliteration": "Oṃ paṭṭinī namaḥ",
    "meaning": "Glory to Paṭṭinī (Goddess of fertility and health)"
  },
  {
    "sanskrit": "ॐ कुमारी नमः",
    "transliteration": "Oṃ kumārī namaḥ",
    "meaning": "Glory to the young princess"
  },
  {
    "sanskrit": "ॐ कौमारी नमः",
    "transliteration": "Oṃ kaumārī namaḥ",
    "meaning": "Glory to the adolescent (Śakti of Skanda – Kumāra)"
  },
  {
    "sanskrit": "ॐ सवित्री नमः",
    "transliteration": "Oṃ savitrī namaḥ",
    "meaning": "Glory to the stimulator/inciter (part of the power of the Sun)"
  },
  {
    "sanskrit": "ॐ गायत्री नमः",
    "transliteration": "Oṃ gāyatrī namaḥ",
    "meaning": "Glory to the singer (embodiment of the Vedic gāyatrī metre)"
  },
  {
    "sanskrit": "ॐ भगवती नमः",
    "transliteration": "Oṃ bhagavatī namaḥ",
    "meaning": "Glory to the Blessed One (a Tantric form of Lakṣmī)"
  },
  {
    "sanskrit": "ॐ जगद्धात्री नमः",
    "transliteration": "Oṃ jagad-dhātrī namaḥ",
    "meaning": "Glory to the creator of the universe (associated with Sarasvatī)"
  },
  {
    "sanskrit": "ॐ गौरी नमः",
    "transliteration": "Oṃ gaurī namaḥ",
    "meaning": "Glory to the fair One"
  },
  {
    "sanskrit": "ॐ अदिती नमः",
    "transliteration": "Oṃ a-ditī namaḥ",
    "meaning": "Glory to the boundless One [lit. ‘unbroken’, ‘undivided’]"
  },
  {
    "sanskrit": "ॐ वऌऌई नमः",
    "transliteration": "Oṃ vaḷḷī namaḥ",
    "meaning": "Glory to Vaḷḷī (Wife of Skanda)"
  },
  {
    "sanskrit": "ॐ देवानी नमः",
    "transliteration": "Oṃ devānī namaḥ",
    "meaning": "Glory to Devānī (Wife of Skanda)"
  },
  {
    "sanskrit": "ॐ इन्द्राणी नमः",
    "transliteration": "Oṃ indrāṇī namaḥ",
    "meaning": "Glory to the female Indra"
  },
  {
    "sanskrit": "ॐ रुक्मणी नमः",
    "transliteration": "Oṃ rukmaṇī namaḥ",
    "meaning": "Glory to Rukmaṇī (Wife of Kṛṣṇa)"
  },
  {
    "sanskrit": "ॐ शिवशिवाभवानी नमः",
    "transliteration": "Oṃ śiva-śivā-bhavānī namaḥ",
    "meaning": "Glory to Existence – Śiva and Śivā (male and female)"
  },
  {
    "sanskrit": "ॐ छन्दी नमः",
    "transliteration": "Oṃ chandī namaḥ",
    "meaning": "Glory to the ferocious One"
  },
  {
    "sanskrit": "ॐ छामुण्डी नमः",
    "transliteration": "Oṃ chāmuṇḍī namaḥ",
    "meaning": "Glory to the emaciated One"
  },
  {
    "sanskrit": "ॐ पर्वती नमः",
    "transliteration": "Oṃ parvatī namaḥ",
    "meaning": "Glory to Parvatī (Wife of Śiva)"
  },
  {
    "sanskrit": "ॐ भैरवी नमः",
    "transliteration": "Oṃ bhairavī namaḥ",
    "meaning": "Glory to the terrifying One (female Bhairava)"
  },
  {
    "sanskrit": "ॐ काशी नमः",
    "transliteration": "Oṃ kāśī namaḥ",
    "meaning": "Glory to the shining One [linked to Vārāṇasī – ‘City of Light’]"
  },
  {
    "sanskrit": "ॐ मातङ्गी नमः",
    "transliteration": "Oṃ mātaṅgī namaḥ",
    "meaning": "Glory to the elephant (fierce child of Kaśyapa & Krodhavaśā)"
  },
  {
    "sanskrit": "ॐ जगदम्बि नमः",
    "transliteration": "Oṃ jagad-ambi namaḥ",
    "meaning": "Glory to the Universal Mother"
  },
  {
    "sanskrit": "ॐ महामाया नमः",
    "transliteration": "Oṃ mahā-māyā namaḥ",
    "meaning": "Glory to the Great Illusion"
  },
  {
    "sanskrit": "ॐ महाशक्ति नमः",
    "transliteration": "Oṃ mahā-śakti namaḥ",
    "meaning": "Glory to Great Power"
  },
  {
    "sanskrit": "ॐ कामाक्षी नमः",
    "transliteration": "Oṃ kāmākṣī namaḥ",
    "meaning": "Glory to the One of desirous-glance"
  },
  {
    "sanskrit": "ॐ मीनाक्षी नमः",
    "transliteration": "Oṃ mīnākṣī namaḥ",
    "meaning": "Glory to the One of fish[-shaped] eye"
  },
  {
    "sanskrit": "ॐ कालिका नमः",
    "transliteration": "Oṃ kālikā namaḥ",
    "meaning": "Glory to the black-coloured One"
  },
  {
    "sanskrit": "ॐ काल्यै नमः",
    "transliteration": "Oṃ kālyai namaḥ",
    "meaning": "Glory to Kālī [lit. ‘the black One’]"
  },
  {
    "sanskrit": "ॐ काली नमः",
    "transliteration": "Oṃ kālī namaḥ",
    "meaning": "Glory to Kālī"
  },
  {
    "sanskrit": "ॐ महाकाली नमः",
    "transliteration": "Oṃ mahā-kālī namaḥ",
    "meaning": "Glory to the Great Kālī"
  },
  {
    "sanskrit": "ॐ भद्रकाली नमः",
    "transliteration": "Oṃ bhadra-kālī namaḥ",
    "meaning": "Glory to the Dear Kālī"
  },
  {
    "sanskrit": "ॐ श्यामकाली नमः",
    "transliteration": "Oṃ śyāma-kālī namaḥ",
    "meaning": "Glory to the Dark Kālī"
  },
  {
    "sanskrit": "ॐ नित्यकाली नमः",
    "transliteration": "Oṃ nitya-kālī namaḥ",
    "meaning": "Glory to the Eternal Kālī"
  },
  {
    "sanskrit": "ॐ रक्षकाली नमः",
    "transliteration": "Oṃ rakṣa-kālī namaḥ",
    "meaning": "Glory to the Protecting Kālī"
  },
  {
    "sanskrit": "ॐ आनन्दकाली नमः",
    "transliteration": "Oṃ ānanda-kālī namaḥ",
    "meaning": "Glory to the Blissful Kālī"
  },
  {
    "sanskrit": "ॐ महिषासुरमर्दिनी नमः",
    "transliteration": "Oṃ mahiṣāsura-mardinī namaḥ",
    "meaning": "Glory to the killer of the demon Mahiṣa"
  },
  {
    "sanskrit": "ॐ एलोकेशी नमः",
    "transliteration": "Oṃ elo-keśī namaḥ",
    "meaning": "Glory to the One with dishevelled hair"
  },
  {
    "sanskrit": "ॐ मुक्तकेशी नमः",
    "transliteration": "Oṃ mukta-keśī namaḥ",
    "meaning": "Glory to the One with loose/flowing hair"
  },
  {
    "sanskrit": "ॐ रक्तदन्त दिगम्बरे नमः",
    "transliteration": "Oṃ rakta-danta dig-ambare namaḥ",
    "meaning": "Glory to the One who is naked [lit. ‘sky-clad’] with bloody-teeth"
  }
];

export default function NamavaliPage() {
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "108 Names of Devi",
    itemListElement: names.map((name, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Thing",
        name: name.transliteration,
        description: name.meaning,
      },
    })),
  };

  return (
    <>
      <JsonLd data={schemaList} />
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <PageHero
          breadcrumb="Spiritual Chants"
          badge="Namavali"
          title="108 Names of"
          titleGold="Divine Mother"
          description="The Ashtottara Shatanamavali is a garland of 108 sacred names. Chanting them purifies the mind and brings inner peace."
        />

        <main className="flex-1 py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
          
          <section className="text-center max-w-2xl mx-auto">
            <ScrollText className="mx-auto size-8 text-amber-800 mb-3" />
            <h2 className="font-serif text-3xl text-amber-950">Devi Ashtottara Shatanamavali</h2>
            <p className="text-sm text-stone-700 mt-2">
              Offer a flower or a grain of rice mentally or physically as you chant each of these 108 holy names of the Mother Goddess.
            </p>
          </section>

          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {names.map((name, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-amber-200/50 hover:border-amber-400 hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-[0.05] transition-opacity">
                  <Sparkles className="size-16" />
                </div>
                
                <div className="text-sm font-bold text-amber-700/50 mb-2">{(i + 1).toString().padStart(3, '0')}</div>
                
                <h3 className="text-2xl font-medium text-amber-950 mb-1">{name.sanskrit}</h3>
                <p className="font-bold text-sm text-stone-800 mb-3">{name.transliteration}</p>
                
                <div className="h-px w-8 bg-amber-200 mb-3"></div>
                <p className="text-xs text-stone-600 leading-relaxed">{name.meaning}</p>
              </div>
            ))}
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
