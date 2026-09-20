const fs = require('fs');

const text = `Oṃ mahā lakṣmī namaḥ
Glory to Mahā Lakṣmī
Oṃ īśvarī namaḥ
Glory to the Goddess
Oṃ kamalā namaḥ
Glory to the lotus [-like] (Lakṣmī)
Oṃ chālā namaḥ
Glory to the moving (shaking, stirring) One
Oṃ bhūtī namaḥ
Glory to Existence
Oṃ hari-priyā namaḥ
Glory to the One who is dear to Viṣṇu
Oṃ padmā namaḥ
Glory to the lotus [-like] (Lakṣmī)
Oṃ padmā-layā namaḥ
Glory to the lotus-dweller
Oṃ sampat namaḥ
Glory to the One who is prosperity
Oṃ ucchaiḥ namaḥ
Glory to the haughty/intense One
Oṃ śrī namaḥ
Glory to the auspicious One (Lakṣmī)
Oṃ padmā-dhārinī namaḥ
Glory to the lotus-wearer
Oṃ durgā namaḥ
Glory to Durgā
Oṃ ambā namaḥ
Glory to Mother
Oṃ gaṅgā namaḥ
Glory to Gaṅgā
Oṃ śāradā namaḥ
Glory to Śāradā (who represents knowledge and joy)
Oṃ tārā namaḥ
Glory to the liberator
Oṃ umā namaḥ
Glory to Umā [lit. ‘One who is Light’]
Oṃ lalitā namaḥ
Glory to the beloved (charming/tender/playful) One
Oṃ rādhā namaḥ
Glory to Rādhā [lit. ‘prosperity’, ‘success’]
Oṃ sītā namaḥ
Glory to Sītā
Oṃ jagan-mātā namaḥ
Glory to the Universal Mother
Oṃ giri-jā namaḥ
Glory to the mountain-born
Oṃ śyāmā namaḥ
Glory to the dark[-coloured] One
Oṃ eka-jātā namaḥ
Glory to the single creation/origin (‘One and only’)
Oṃ guru-guhā namaḥ
Glory to the refuge of gurus
Oṃ anna-pūrṇā namaḥ
Glory to the food-filled One
Oṃ nīla-sarasvatī namaḥ
Glory to the dark-blue Sarasvatī (a fierce aspect of Tārā)
Oṃ śākam-bharī namaḥ
Glory to the herb/vegetable nourisher
Oṃ mahā-devī namaḥ
Glory to the Great Goddess
Oṃ brahmāṇī namaḥ
Glory to the female Brahmā (Sarasvatī)
Oṃ rudrāṇī namaḥ
Glory to the female Rudra (Durgā)
Oṃ vaiṣṇavī namaḥ
Glory to the female Viṣṇu (Lakṣmī)
Oṃ nārāyaṇī namaḥ
Glory to the refuge of mankind
Oṃ mohinī namaḥ
Glory to the deceiver (Viṣṇu took a female form to trick demons)
Oṃ ūrvaśī namaḥ
Glory to the immense One (Personification of the Dawn)
Oṃ varāhī namaḥ
Glory to the boar (female Varāha – the 3rd Avatāra of Viṣṇu)
Oṃ sundarī namaḥ
Glory to the beautiful One
Oṃ jananī namaḥ
Glory to Mother [lit. ‘birth giver’]
Oṃ nāra-siṃhī namaḥ
Glory to the female Nāra-siṃha (Man-lion)
Oṃ hara-siddhī namaḥ
Glory to the ability of the destroyer (Śiva)
Oṃ mahā-rātri namaḥ
Glory to the great-night
Oṃ kāla-rātri namaḥ
Glory to the black-night
Oṃ padmā-vatī namaḥ
Glory to the lotus-bearer
Oṃ śiva-dūtī namaḥ
Glory to Śiva’s messenger
Oṃ śaila-putrī namaḥ
Glory to the daughter of the mountain
Oṃ siṃha-vāhinī namaḥ
Glory to the lion-rider
Oṃ vindhya-vāsinī namaḥ
Glory to the mountain-dweller
Oṃ mātā-bhavanī namaḥ
Glory to the mother of Existence
Oṃ maheśvarī namaḥ
Glory to the Great Goddess
Oṃ śaṅkarī namaḥ
Glory to the female Śaṅkara (i.e. Parvatī) [lit. ‘beneficent’]
Oṃ durgeśvarī namaḥ
Glory to Goddess Durgā [implies overcoming of difficulty]
Oṃ jagad-īśvarī namaḥ
Glory to the Universal Goddess
Oṃ bhuvaneśvarī namaḥ
Glory to the Goddess of the earth
Oṃ tri-pura-sundarī namaḥ
Glory to Tripurasundarī [lit. ‘The Beauty of the Three Citadels’]
Oṃ rāja-rājeśvarī namaḥ
Glory to Rājarājeśvarī [lit. ‘Goddess of the King of Kings’]
Oṃ parameśvarī namaḥ
Glory to the Supreme Goddess
Oṃ sureśvarī namaḥ
Glory to the Goddess of the Gods
Oṃ siddheśvarī namaḥ
Glory to the Goddess of accomplishment
Oṃ sarveśvarī namaḥ
Glory to the Goddess of all
Oṃ kāmeśvarī namaḥ
Glory to the Goddess of desire
Oṃ kamaleśvarī namaḥ
Glory to the Goddess of the lotus
Oṃ akhilāṇḍeśvarī namaḥ
Glory to the Goddess-ruler of the Universe
Oṃ śaśī-śekharī namaḥ
Glory to the One who wears the Moon as a diadem
Oṃ bhayaṅkarī namaḥ
Glory to the One who instills fear
Oṃ devī-kuṇḍalinī namaḥ
Glory to the ‘serpentine power’ of the Goddess
Oṃ satya-svarūpinī namaḥ
Glory to the One whose own nature is Truth
Oṃ prema-pradāyinī namaḥ
Glory to the giver of love
Oṃ ānanda-dāyinī namaḥ
Glory to the giver of bliss
Oṃ pālinī namaḥ
Glory to the protector
Oṃ paṭṭinī namaḥ
Glory to Paṭṭinī (Goddess of fertility and health)
Oṃ kumārī namaḥ
Glory to the young princess
Oṃ kaumārī namaḥ
Glory to the adolescent (Śakti of Skanda – Kumāra)
Oṃ savitrī namaḥ
Glory to the stimulator/inciter (part of the power of the Sun)
Oṃ gāyatrī namaḥ
Glory to the singer (embodiment of the Vedic gāyatrī metre)
Oṃ bhagavatī namaḥ
Glory to the Blessed One (a Tantric form of Lakṣmī)
Oṃ jagad-dhātrī namaḥ
Glory to the creator of the universe (associated with Sarasvatī)
Oṃ gaurī namaḥ
Glory to the fair One
Oṃ a-ditī namaḥ
Glory to the boundless One [lit. ‘unbroken’, ‘undivided’]
Oṃ vaḷḷī namaḥ
Glory to Vaḷḷī (Wife of Skanda)
Oṃ devānī namaḥ
Glory to Devānī (Wife of Skanda)
Oṃ indrāṇī namaḥ
Glory to the female Indra
Oṃ rukmaṇī namaḥ
Glory to Rukmaṇī (Wife of Kṛṣṇa)
Oṃ śiva-śivā-bhavānī namaḥ
Glory to Existence – Śiva and Śivā (male and female)
Oṃ chandī namaḥ
Glory to the ferocious One
Oṃ chāmuṇḍī namaḥ
Glory to the emaciated One
Oṃ parvatī namaḥ
Glory to Parvatī (Wife of Śiva)
Oṃ bhairavī namaḥ
Glory to the terrifying One (female Bhairava)
Oṃ kāśī namaḥ
Glory to the shining One [linked to Vārāṇasī – ‘City of Light’]
Oṃ mātaṅgī namaḥ
Glory to the elephant (fierce child of Kaśyapa & Krodhavaśā)
Oṃ jagad-ambi namaḥ
Glory to the Universal Mother
Oṃ mahā-māyā namaḥ
Glory to the Great Illusion
Oṃ mahā-śakti namaḥ
Glory to Great Power
Oṃ kāmākṣī namaḥ
Glory to the One of desirous-glance
Oṃ mīnākṣī namaḥ
Glory to the One of fish[-shaped] eye
Oṃ kālikā namaḥ
Glory to the black-coloured One
Oṃ kālyai namaḥ
Glory to Kālī [lit. ‘the black One’]
Oṃ kālī namaḥ
Glory to Kālī
Oṃ mahā-kālī namaḥ
Glory to the Great Kālī
Oṃ bhadra-kālī namaḥ
Glory to the Dear Kālī
Oṃ śyāma-kālī namaḥ
Glory to the Dark Kālī
Oṃ nitya-kālī namaḥ
Glory to the Eternal Kālī
Oṃ rakṣa-kālī namaḥ
Glory to the Protecting Kālī
Oṃ ānanda-kālī namaḥ
Glory to the Blissful Kālī
Oṃ mahiṣāsura-mardinī namaḥ
Glory to the killer of the demon Mahiṣa
Oṃ elo-keśī namaḥ
Glory to the One with dishevelled hair
Oṃ mukta-keśī namaḥ
Glory to the One with loose/flowing hair
Oṃ rakta-danta dig-ambare namaḥ
Glory to the One who is naked [lit. ‘sky-clad’] with bloody-teeth`;

// Very basic transliterator from IAST to Devanagari just for these strings
const iastToDeva = {
  'a': 'अ', 'ā': 'आ', 'i': 'इ', 'ī': 'ई', 'u': 'उ', 'ū': 'ऊ', 'ṛ': 'ऋ', 'ṝ': 'ॠ',
  'ḷ': 'ऌ', 'ḹ': 'ॡ', 'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
  'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ṅ': 'ङ',
  'c': 'च', 'ch': 'छ', 'j': 'ज', 'jh': 'झ', 'ñ': 'ञ',
  'ṭ': 'ट', 'ṭh': 'ठ', 'ḍ': 'ड', 'ḍh': 'ढ', 'ṇ': 'ण',
  't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
  'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
  'ś': 'श', 'ṣ': 'ष', 's': 'स', 'h': 'ह',
  'ṃ': 'ं', 'ḥ': 'ः', 'ḷ': 'ळ'
};

function transliterate(str) {
  // A simplistic script for transforming IAST to Devanagari.
  // We'll skip complex transliteration and just output something sensible.
  // Actually, since the user didn't ask for sanskrit script, maybe I can just leave it as IAST.
  // But wait, it looks much better if it has sanskrit.
  // Let's use a library if available, or just map it.
  return str; // Fallback
}

const lines = text.split('\n').map(l => l.trim()).filter(l => l);
const names = [];

for (let i = 0; i < lines.length; i += 2) {
  const trans = lines[i] || "";
  const meaning = lines[i+1] || "";
  if (trans && meaning) {
    // try to auto-generate sanskrit manually for known words
    let sanskrit = trans;
    sanskrit = sanskrit.replace(/Oṃ/g, "ॐ");
    sanskrit = sanskrit.replace(/namaḥ/g, "नमः");
    names.push({ sanskrit, transliteration: trans, meaning });
  }
}

// Just output JSON
fs.writeFileSync('names.json', JSON.stringify(names, null, 2));
