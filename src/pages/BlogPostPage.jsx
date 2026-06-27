import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Clock, User, Calendar, Eye, Bookmark, Share2, ArrowRight, ChevronRight, Play, Quote } from "lucide-react";

const NAV = ["Itinerary", "Visa", "Hotel & Air", "MICE", "Blogs", "About Us", "Contact"];
const navRoutes = { "Visa": "/visa", "MICE": "/mice", "Blogs": "/blog", "About Us": "/about", "Contact": "/contact" };

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const ALL_POSTS = {
  1: {
    id: 1, tag: "Adventure", tagColor: "#00bcd4",
    title: "The Ultimate Guide to Trekking Spiti Valley in Winter",
    author: "Kabir Thakur", date: "June 12, 2025", readTime: "8 min read", views: "12.4k",
    heroImg: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80",
    intro: "Spiti in winter is not for the faint-hearted — but for those who brave it, the valley reveals a side of the Himalayas that most travellers never see. Roads are buried under snow, the air bites with a cold that makes you feel truly alive, and the villages feel like they exist outside of time itself.",
    sections: [
      { heading: "When to go — and what to expect", body: "The winter window runs from December through February. Average temperatures hover between -15°C and -20°C at night in Kaza, the district headquarters. Don't let that scare you — the cold is dry, not damp, and layering correctly makes it entirely manageable. What you get in return: zero crowds, monasteries lit only by butter lamps, and landscapes so impossibly white and still that your camera can barely do them justice." },
      { heading: "Getting there in winter", body: "The Manali–Kaza highway via Rohtang Pass is completely closed. Your only option is the Shimla–Kaza route via Narkanda and Reckong Peo. Roads are often cleared by afternoon, but be prepared for early starts and potential delays. We recommend hiring a local driver from Reckong Peo — they know when to wait and when to push. Budget two full days from Shimla to Kaza." },
      { heading: "Where to stay", body: "Most guesthouses in Kaza stay open through winter. Sakya Abode and Spiti Holiday Home both run 24-hour heating and serve hot meals. In Pin Valley, a handful of homestays remain open and offer the most authentic experience — waking up to frozen window panes and a host pressing butter chai into your hands before you've even sat up." },
    ],
    pullQuote: "The cold is dry, not damp. Layer correctly, and what you get in return is a landscape so impossibly white and still that your camera can barely do it justice.",
    tips: ["Carry a quality sleeping bag rated to -20°C even if your homestay has blankets", "Acclimatise in Shimla or Reckong Peo for a day before ascending", "Download offline maps — signal disappears for long stretches", "Carry cash; ATMs in Kaza are unreliable in winter", "The Chandratal Lake trail is inaccessible in deep winter — save it for May"],
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
    ],
    videoId: "l3KJZ7KQfOk",
    videoPoster: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
    authorBio: "Kabir has spent over a decade guiding treks in the Indian Himalayas. He believes every mountain deserves at least two visits — once in summer, once in winter.",
    authorImg: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=faces",
  },
  2: {
    id: 2, tag: "Culture", tagColor: "#A78BFA",
    title: "Why Ladakh's Monasteries Are More Than Just Monuments",
    author: "Saanvi Rao", date: "May 28, 2025", readTime: "6 min read", views: "8.1k",
    heroImg: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1600&q=80",
    intro: "The sound of prayer wheels, the scent of juniper incense, and the silence between mountains — Ladakh's monasteries offer something no itinerary can fully prepare you for. These are not museum pieces. They are alive, inhabited, and deeply purposeful.",
    sections: [
      { heading: "Hemis — the largest and the most misunderstood", body: "Most visitors arrive at Hemis during the July festival, cameras raised, ready for the mask dances. But Hemis between festivals is a different place entirely — quieter, more open, and infinitely more personal. Monks invite you into study rooms. Butter lamps flicker in chambers that have barely changed in three centuries. The library holds manuscripts that predate most of what we call history." },
      { heading: "Thiksey — a monastery that looks like a miniature Potala", body: "The comparison to Lhasa's Potala Palace is not an accident. Thiksey rises in 12 tiers above the Indus Valley, and inside it holds a 15-metre seated Maitreya Buddha — the future Buddha — installed in 1980. Arrive before 7am for morning prayers, when the monks assemble and the sound of horns and cymbals rolls down the valley like thunder." },
      { heading: "The monks and what they're actually doing", body: "Debate is the backbone of Tibetan Buddhist monastic education. In the evenings at Spituk and other monasteries, you'll see young monks clapping their hands sharply as they make logical points — not aggression, but emphasis. It's theatrical and precise and nothing like what you'd expect from a silent, meditative tradition. If you sit quietly nearby, no one will ask you to leave." },
    ],
    pullQuote: "These are not museum pieces. They are alive, inhabited, and deeply purposeful — and the monks will tell you as much if you ask.",
    tips: ["Remove shoes before entering prayer halls — always", "Ask before photographing monks or interiors", "Attend morning prayers (5–7am) for an experience no tourist package includes", "Dress conservatively — shoulders and knees covered", "The monastery guesthouses at Lamayuru and Hemis are exceptional"],
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    videoId: "gR02iHNNDtE",
    videoPoster: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
    authorBio: "Saanvi maps experiences that blend culture, adventure, and authentic local connections. She has visited every major monastery in Ladakh at least twice.",
    authorImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces",
  },
  3: {
    id: 3, tag: "Budget Tips", tagColor: "#FBBF24",
    title: "How to Do Manali in ₹15,000 — Including Flights",
    author: "Imran Sheikh", date: "May 10, 2025", readTime: "5 min read", views: "19.2k",
    heroImg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    intro: "Yes, it's possible. ₹15,000 for a 5-day Manali trip including return flights from Delhi. We've done it, we've tested it, and below is the exact breakdown — no hidden costs, no staying in places you'd be ashamed to photograph.",
    sections: [
      { heading: "Flights: Delhi → Bhuntar → Delhi (₹4,200–₹5,500)", body: "The Kullu-Manali airport at Bhuntar is 50km from Manali town. IndiGo and Air India run direct flights from Delhi for ₹2,100–₹2,750 each way if you book 6–8 weeks ahead. Avoid holiday weekends. Tuesday and Wednesday departures are consistently the cheapest. Set a price alert on Google Flights and wait for a dip." },
      { heading: "Staying well for ₹400–₹600 a night", body: "Old Manali has a cluster of guesthouses between the Manu Temple and the old bridge that are clean, warm, and genuinely characterful. Zostel Manali is ₹450 per night in a dorm; private rooms at family-run guesthouses like Drifter's Inn run ₹600–₹800. Avoid the main Mall Road — you pay 40% more for worse views." },
      { heading: "Eating well without burning the budget", body: "The Drifter's Café and Moon Dance Café in Old Manali serve full meals for ₹150–₹250. Dylan's Toasty Café does the best apple pie north of Delhi. For local thali, find the Himachali dhabas near the bus stand — ₹80 gets you rajma rice, dal, roti, and a glass of chaas. Avoid tourist restaurants on Mall Road for anything beyond the occasional splurge." },
    ],
    pullQuote: "₹15,000 for five days in Manali including flights. No compromises on experience — just smart choices on where the money actually goes.",
    tips: ["Book flights 6–8 weeks in advance for the best fares", "Carry cash — many Old Manali guesthouses don't take cards", "The Solang Valley bus (₹30) beats any taxi quote", "Avoid Rohtang permits on weekends — traffic kills half your day", "The apple orchards are beautiful in May — don't just rush to the snow"],
    gallery: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    ],
    videoId: "8_lfxPI5ObM",
    videoPoster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    authorBio: "Imran has travelled to over 40 Indian destinations on a shoestring and never once stayed somewhere he'd be embarrassed to recommend.",
    authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=faces",
  },
  4: {
    id: 4, tag: "Hidden Gems", tagColor: "#F87171",
    title: "Chopta: The Uttarakhand Village Nobody Talks About",
    author: "Kabir Thakur", date: "April 22, 2025", readTime: "7 min read", views: "6.7k",
    heroImg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
    intro: "Forget Rishikesh and Mussoorie. Chopta is Uttarakhand's best-kept secret — a meadow at 2,680 metres ringed by rhododendron forests and overlooked by the Tungnath temple, the highest Shiva shrine in the world. The views rival anything in the Swiss Alps and the crowds are a fraction of any other hill station in the region.",
    sections: [
      { heading: "Tungnath and the trek above", body: "The 3.5km trek from Chopta to Tungnath temple (3,680m) is gentle enough for first-timers but rewarding enough for experienced trekkers. From Tungnath, continue 1.5km further to Chandrashila summit (4,130m) for a 360-degree panorama that includes Nanda Devi, Trishul, Kedar Peak, and on clear days, the distant white of the Karakoram." },
      { heading: "When to visit", body: "April–June: Rhododendrons in full bloom, crisp air, trail open. September–November: Clear skies, golden meadows, ideal photography. December–February: Deep snow, the trail may require crampons, but Tungnath temple is closed — the idol is moved to Ukhimath for the winter. Monsoon (July–August) brings leeches and closed trails — avoid." },
      { heading: "Getting there without a tour operator", body: "Take a Rishikesh–Rudraprayag bus (₹200, 5hrs), then a shared jeep to Ukhimath (₹80, 1.5hrs), then another shared jeep to Chopta (₹60, 45 mins). Total cost: ₹340. You'll be dropped right at the start of the Tungnath trail. A private taxi from Rishikesh costs ₹2,800–₹3,500 but saves 3 hours." },
    ],
    pullQuote: "The views from Chandrashila rival anything in the Swiss Alps. You'll be looking at four of India's greatest peaks with barely another soul in sight.",
    tips: ["Start the Tungnath trek by 6am to beat clouds", "Camping in the Chopta meadow is allowed and magical", "Carry your own food — only 2–3 dhabas operate on the trail", "The road beyond Ukhimath can be rough — sit near the front of shared jeeps", "Chopta to Deoria Tal is a beautiful extension if you have an extra day"],
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
    ],
    videoId: "l3KJZ7KQfOk",
    videoPoster: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    authorBio: "Kabir has spent over a decade guiding treks in the Indian Himalayas and believes Chopta is the most underrated trek in the country.",
    authorImg: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=faces",
  },
  5: {
    id: 5, tag: "Travel Guides", tagColor: "#00bcd4",
    title: "Kashmir in Spring: The Complete 7-Day Itinerary",
    author: "Saanvi Rao", date: "April 5, 2025", readTime: "9 min read", views: "22.5k",
    heroImg: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80",
    intro: "Tulip gardens, shikaras, and a food scene that will haunt you for years. April in Kashmir is a sensory overload — in the best possible way. Here is a complete 7-day itinerary that balances the famous sights with places most visitors never find.",
    sections: [
      { heading: "Days 1–2: Srinagar — Dal Lake and the old city", body: "Stay on a houseboat on Dal Lake. Wander Khanqah-i-Moula, the 14th-century Sufi shrine on the Jhelum riverfront. Eat wazwan — the 36-course Kashmiri feast — at Mughal Darbar on Residency Road. On Day 2, visit the Indira Gandhi Tulip Garden (mid-March to mid-April only) when roughly 1.5 million tulips are in bloom across 12 terraces overlooking Dal Lake." },
      { heading: "Days 3–4: Gulmarg — meadows and the gondola", body: "The 2.5-hour drive from Srinagar to Gulmarg is spectacular in April — snow still crowns the peaks while the meadow itself turns green. Take the Gondola to Phase 2 (4,200m) for views deep into Pakistan-administered Kashmir and the Nanga Parbat massif. In the evenings, stay at the Khyber Resort or the simpler Hotel Highlands for proper Kashmiri kahwa before bed." },
      { heading: "Days 5–7: Pahalgam and the Lidder Valley", body: "Pahalgam sits at the confluence of two rivers — the Lidder and the Sheshnag stream — and in April the valley floor is carpeted in wildflowers. The Betaab Valley (named after the 1983 Bollywood film shot here) is 15km away and even less crowded than Pahalgam town. Arrange a horse trek to Baisaran meadow (2,438m) on Day 6 — the views north toward Kolahoi glacier are unlike anything else in the valley." },
    ],
    pullQuote: "April in Kashmir is a sensory overload — in the best possible way. 1.5 million tulips in bloom, fresh trout from mountain streams, and shikaras gliding at dawn.",
    tips: ["Book houseboats directly — avoid aggregators who upcharge heavily", "April tulip season is peak — book flights and accommodation 6 weeks ahead", "Try Kashmiri saag, dum aloo and noon chai at least once a day", "Local guides in Pahalgam charge ₹800/day and are worth every rupee", "The Mughal Road (Shopian to Banihal) opens in late April — an unmissable drive"],
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    videoId: "gR02iHNNDtE",
    videoPoster: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
    authorBio: "Saanvi has visited Kashmir four times across four different seasons. She believes spring is the only season that does the valley full justice.",
    authorImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces",
  },
  6: {
    id: 6, tag: "Adventure", tagColor: "#00bcd4",
    title: "Paragliding in Bir Billing: Everything You Need to Know",
    author: "Imran Sheikh", date: "March 18, 2025", readTime: "6 min read", views: "9.3k",
    heroImg: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80",
    intro: "It's called the paragliding capital of Asia — and for good reason. Bir Billing's combination of geography, thermals, and altitude makes it one of the top five paragliding sites in the world. Here is our complete guide to taking the leap.",
    sections: [
      { heading: "Bir vs Billing — understanding the setup", body: "Bir is the take-off village at 1,525m; Billing is the launch site at 2,430m, 14km uphill. You drive up to Billing, launch from there, and land in Bir's landing field — a 25–35 minute flight through thermals that can take you up to 2,800m if conditions are right. The Dhauladhar range fills the horizon the entire time." },
      { heading: "Solo vs tandem — what to book", body: "Unless you are a licensed pilot, you'll fly tandem with an instructor. Tandem flights cost ₹2,500–₹3,500 and last 25–45 minutes depending on thermals. For solo flying, Bir has several reputable paragliding schools offering 8-day P1 basic courses (₹18,000–₹22,000). The Paragliding World Cup is held here biennially — watching it is free and extraordinary." },
      { heading: "When thermals are best", body: "October and November are the prime months — thermals are predictable, skies are clear, and the mountain views are at their sharpest after the monsoon has washed the air clean. March–May is also excellent. Avoid July–September (monsoon) entirely. Morning flights (8–11am) are smoother; afternoon thermals are stronger but more turbulent." },
    ],
    pullQuote: "The Dhauladhar range fills the horizon the entire time you are in the air. Nothing prepares you for the moment the ground drops away and silence replaces everything.",
    tips: ["Book with operators registered with the Himachal Pradesh Tourism Board", "Wear full-length clothes and closed shoes — it gets cold at altitude", "GoPro rentals are available at launch — worth the ₹500 for the footage", "Morning flights are smoother; book the first slot of the day", "Combine with a visit to the Tibetan colony and monastery in Bir village"],
    gallery: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    videoId: "8_lfxPI5ObM",
    videoPoster: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    authorBio: "Imran completed his P1 paragliding certification in Bir in 2022 and has since done over 40 tandem and solo flights in the region.",
    authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=faces",
  },
  7: {
    id: 7, tag: "Culture", tagColor: "#A78BFA",
    title: "Eating Your Way Through Kerala: A Food Lover's Journey",
    author: "Saanvi Rao", date: "March 2, 2025", readTime: "7 min read", views: "11.0k",
    heroImg: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=80",
    intro: "From toddy shops in Alleppey to seafood stalls in Kochi, Kerala's food culture is as rich and layered as its backwaters. This is not a cuisine you eat — it's one you experience. Slow-cooked, coconut-rich, and deeply tied to the rhythms of the land and sea.",
    sections: [
      { heading: "Kochi — where the food is as layered as the history", body: "Fort Kochi's food scene reflects 500 years of Portuguese, Dutch, Chinese, and British influence layered onto a Keralan base. Dhe Puttu on Convent Road serves 40 varieties of puttu — the steamed rice cylinder that is Kerala's true breakfast staple. The Jewish Bakery in Jew Town makes the only apple strudel you will find in South India. The Chinese fishing nets at sunrise are beautiful; the fish market below them at 7am is even better." },
      { heading: "Alleppey — backwaters and the toddy shop", body: "A toddy shop is not a bar. It's a cultural institution. The fermented coconut palm sap served here — mildly alcoholic, sweet in the morning, sharp by afternoon — has been part of Kerala's food culture for centuries. Kottayam District's toddy shops are the most famous, but Alleppey has several that serve remarkable fish curry alongside. Order the karimeen (pearl spot fish) prepared in a banana leaf — there is nothing like it." },
      { heading: "The sadhya — 28 dishes on a banana leaf", body: "The Onam sadhya is Kerala's great communal feast — 28 vegetarian dishes served on a fresh banana leaf in a specific sequence from left to right, ending with payasam. You don't need to visit during Onam to eat one; Brahmins Restaurant in Thrissur serves a full sadhya every day. The sequence and logic of the meal — astringent before sweet, bitter before sour — is a masterclass in balance." },
    ],
    pullQuote: "A toddy shop is not a bar. It's a cultural institution — and the fish curry served alongside the fermented palm wine is some of the finest food you will eat in India.",
    tips: ["Eat breakfast like a Keralite — appam with stew, or puttu with kadala curry", "The best seafood is at the smallest, most unremarkable-looking stalls near docks", "Banana leaf meals must be eaten with your right hand — that's not optional", "Try the banana chips and halwa from Kozhikode — bring extra luggage", "Malabar biryani (Kozhikode) and Thalassery biryani are completely different — try both"],
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    videoId: "gR02iHNNDtE",
    videoPoster: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    authorBio: "Saanvi spent three weeks eating her way through Kerala for this article. She gained 2kg and has zero regrets.",
    authorImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces",
  },
};

const RELATED = {
  "Adventure":     [2, 4, 6],
  "Culture":       [1, 5, 7],
  "Budget Tips":   [1, 4, 6],
  "Hidden Gems":   [1, 3, 6],
  "Travel Guides": [2, 5, 7],
};

export default function BlogPostPage() {
  const { id } = useParams();
  const post = ALL_POSTS[parseInt(id)];
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [bodyRef, bodyInView] = useInView(0.08);
  const [galleryRef, galleryInView] = useInView(0.1);
  const [videoRef, videoInView] = useInView(0.2);
  const [tipsRef, tipsInView] = useInView(0.15);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!post) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ fontSize: 32, color: "#0D1321", marginBottom: 16 }}>Article not found</h2>
      <Link to="/blog" style={{ color: "#00bcd4", fontWeight: 700, fontSize: 16 }}>← Back to Blog</Link>
    </div>
  );

  const relatedIds = (RELATED[post.tag] || []).filter(rid => rid !== post.id).slice(0, 3);
  const relatedPosts = relatedIds.map(rid => ALL_POSTS[rid]).filter(Boolean);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1A1A2E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes slideIn  { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn  { from { opacity:0; transform:scale(0.93); } to { opacity:1; transform:scale(1); } }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(10,191,188,0.4)} 50%{box-shadow:0 0 0 10px rgba(10,191,188,0)} }

        .gallery-img { transition: transform 0.5s ease, box-shadow 0.3s ease; }
        .gallery-img:hover { transform: scale(1.04); box-shadow: 0 20px 50px rgba(0,0,0,0.18); }

        .related-card { transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease; }
        .related-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(0,0,0,0.12); }
        .related-card .rel-img { transition: transform 0.5s ease; }
        .related-card:hover .rel-img { transform: scale(1.07); }

        .section-body p { font-size: 16px; line-height: 1.85; color: #374151; margin-bottom: 20px; }
      `}</style>

      {/* NAVBAR */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#0D1321", color: "#fff", fontWeight: 800, fontSize: 20, padding: "5px 10px", borderRadius: 6 }}>K2</div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#0D1321" }}>JOURNEYS</span>
        </div>
        <nav style={{ display: "flex", gap: 32 }}>
          {NAV.map(l => {
            const to = navRoutes[l];
            const isActive = l === "Blogs";
            const style = { fontSize: 14, fontWeight: 500, color: isActive ? "#00bcd4" : "#374151", borderBottom: isActive ? "2px solid #00bcd4" : "2px solid transparent", paddingBottom: 4 };
            return to ? <Link key={l} to={to} style={style}>{l}</Link> : <span key={l} style={style}>{l}</span>;
          })}
        </nav>
        <Link to="/contact" style={{ background: "#00bcd4", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 24, display: "flex", alignItems: "center", gap: 8 }}>
          Book Now <ArrowRight size={14} />
        </Link>
      </header>

      {/* HERO */}
      <section ref={heroRef} style={{ position: "relative", height: 520, overflow: "hidden" }}>
        <img src={post.heroImg} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: heroInView ? "scale(1.04)" : "scale(1)", transition: "transform 8s ease", willChange: "transform" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,19,33,0.25) 0%, rgba(13,19,33,0.75) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "48px 80px" }}>
          <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600, marginBottom: 20, width: "fit-content", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#00bcd4"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span style={{ background: post.tagColor, color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 12, display: "inline-block", marginBottom: 16, width: "fit-content", animation: heroInView ? "fadeUp 0.5s ease both" : "none" }}>{post.tag}</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "#fff", lineHeight: 1.15, maxWidth: 780, textShadow: "0 2px 20px rgba(0,0,0,0.4)", animation: heroInView ? "fadeUp 0.6s ease 0.1s both" : "none" }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 20, color: "rgba(255,255,255,0.75)", fontSize: 13.5, animation: heroInView ? "fadeUp 0.6s ease 0.2s both" : "none" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><User size={14} />{post.author}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={14} />{post.date}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={14} />{post.readTime}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Eye size={14} />{post.views} views</span>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section ref={bodyRef} style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 0" }}>

        {/* Action row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #F3F4F6", animation: bodyInView ? "fadeUp 0.5s ease both" : "none" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setSaved(s => !s)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 20, border: `1.5px solid ${saved ? "#00bcd4" : "#E5E7EB"}`, background: saved ? "#E6F9F9" : "#fff", color: saved ? "#00bcd4" : "#6B7280", fontWeight: 600, fontSize: 13.5, transition: "all 0.2s" }}>
              <Bookmark size={15} fill={saved ? "#00bcd4" : "none"} /> {saved ? "Saved" : "Save"}
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 20, border: "1.5px solid #E5E7EB", background: "#fff", color: "#6B7280", fontWeight: 600, fontSize: 13.5 }}>
              <Share2 size={15} /> Share
            </button>
          </div>
          <span style={{ fontSize: 13, color: "#9CA3AF" }}>{post.readTime}</span>
        </div>

        {/* Intro */}
        <p style={{ fontSize: 18, lineHeight: 1.85, color: "#374151", marginBottom: 36, fontWeight: 400, animation: bodyInView ? "fadeUp 0.6s ease 0.1s both" : "none" }}>{post.intro}</p>

        {/* Sections */}
        <div className="section-body">
          {post.sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: 40, animation: bodyInView ? `fadeUp 0.6s ease ${0.15 + i * 0.1}s both` : "none" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#0D1321", marginBottom: 16, lineHeight: 1.3 }}>{sec.heading}</h2>
              <p>{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div style={{ margin: "48px 0", padding: "32px 36px", background: "linear-gradient(135deg, #E6F9F9, #F0FAFA)", borderRadius: 18, borderLeft: `4px solid #00bcd4`, position: "relative", animation: bodyInView ? "scaleIn 0.6s ease both" : "none" }}>
          <Quote size={28} color="#00bcd4" style={{ marginBottom: 14, opacity: 0.7 }} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", color: "#0D1321", lineHeight: 1.7, margin: 0 }}>{post.pullQuote}</p>
          <p style={{ marginTop: 16, fontSize: 13.5, fontWeight: 700, color: "#00bcd4" }}>— {post.author}</p>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section ref={galleryRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 4, height: 28, background: "#00bcd4", borderRadius: 2 }} />
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#0D1321" }}>From the Journey</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ gridRow: "1 / 3", overflow: "hidden", borderRadius: 18, animation: galleryInView ? "scaleIn 0.6s ease both" : "none" }}>
            <img src={post.gallery[0]} alt="gallery" className="gallery-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 380 }} />
          </div>
          {post.gallery.slice(1).map((img, i) => (
            <div key={i} style={{ overflow: "hidden", borderRadius: 18, animation: galleryInView ? `scaleIn 0.6s ease ${0.1 + i * 0.1}s both` : "none" }}>
              <img src={img} alt="gallery" className="gallery-img" style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section ref={videoRef} style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 4, height: 28, background: "#00bcd4", borderRadius: 2 }} />
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#0D1321" }}>Watch the Journey</h3>
        </div>
        <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", animation: videoInView ? "scaleIn 0.7s ease both" : "none" }}>
          {!videoPlaying ? (
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setVideoPlaying(true)}>
              <img src={post.videoPoster} alt="video thumbnail" style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(13,19,33,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transition: "transform 0.2s, box-shadow 0.2s", animation: "pulse 2.5s infinite" }}>
                  <Play size={32} color="#00bcd4" fill="#00bcd4" style={{ marginLeft: 4 }} />
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(13,19,33,0.75)", borderRadius: 10, padding: "10px 18px", backdropFilter: "blur(8px)" }}>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>▶ Watch: {post.title}</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 }}>Click to play</p>
              </div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1&rel=0`}
              title={post.title}
              style={{ width: "100%", height: 460, border: "none", display: "block" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </section>

      {/* KEY TIPS */}
      <section ref={tipsRef} style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ background: "#0D1321", borderRadius: 20, padding: "36px 40px", animation: tipsInView ? "fadeUp 0.6s ease both" : "none" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#00bcd4" }}>✦</span> Key Tips Before You Go
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {post.tips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", animation: tipsInView ? `fadeUp 0.5s ease ${i * 0.07}s both` : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#00bcd4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: 14.5, color: "#D1D5DB", lineHeight: 1.65 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 72px" }}>
        <div style={{ background: "#F9FAFB", borderRadius: 18, padding: "28px 32px", display: "flex", gap: 22, alignItems: "center", border: "1px solid #E5E7EB" }}>
          <img src={post.authorImg} alt={post.author} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "3px solid #00bcd4" }} />
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#00bcd4", letterSpacing: 2, marginBottom: 4 }}>WRITTEN BY</p>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: "#0D1321", marginBottom: 6 }}>{post.author}</h4>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65 }}>{post.authorBio}</p>
          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section style={{ background: "#F9FAFB", padding: "64px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#0D1321" }}>More to Read</h3>
            <Link to="/blog" style={{ display: "flex", alignItems: "center", gap: 6, color: "#00bcd4", fontWeight: 700, fontSize: 14 }}>
              All Articles <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${relatedPosts.length}, 1fr)`, gap: 24 }}>
            {relatedPosts.map(rp => (
              <Link key={rp.id} to={`/blog/${rp.id}`} className="related-card" style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid #E5E7EB", display: "block" }}>
                <div style={{ overflow: "hidden", height: 180 }}>
                  <img src={rp.heroImg} alt={rp.title} className="rel-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <span style={{ background: rp.tagColor + "22", color: rp.tagColor, fontSize: 11.5, fontWeight: 700, padding: "4px 11px", borderRadius: 10, display: "inline-block", marginBottom: 10 }}>{rp.tag}</span>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#0D1321", lineHeight: 1.35, marginBottom: 14 }}>{rp.title}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#00bcd4", fontWeight: 700, fontSize: 13.5 }}>
                    Read <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ background: "#0D1321", padding: "48px 80px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid #1F2937", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ background: "#00bcd4", color: "#fff", fontWeight: 800, fontSize: 18, padding: "4px 9px", borderRadius: 5 }}>K2</div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#fff" }}>JOURNEYS</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {Object.entries(navRoutes).map(([l, to]) => (
              <Link key={l} to={to} style={{ fontSize: 13.5, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 5 }}><ChevronRight size={12} color="#00bcd4" />{l}</Link>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280", fontSize: 12.5 }}>
          <span>© 2025 K2 Journeys. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
