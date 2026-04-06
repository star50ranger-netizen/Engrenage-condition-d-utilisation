import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ExternalLink, 
  ShieldCheck, 
  Database, 
  Scale, 
  HelpCircle, 
  MessageSquare, 
  ArrowRight, 
  Search, 
  Copy, 
  Check, 
  ChevronUp,
  Printer,
  Menu,
  X
} from "lucide-react";

export default function App() {
  const currentYear = new Date().getFullYear();
  const lastUpdate = "6 avril 2026";
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = useMemo(() => [
    {
      id: "intro",
      title: "Acceptation des Conditions",
      icon: <ShieldCheck className="w-6 h-6" />,
      content: "En ajoutant Engrenage à votre serveur Discord ou en interagissant avec lui, vous reconnaissez avoir lu, compris et accepté sans réserve les présentes Conditions d'Utilisation. Si vous n'acceptez pas ces termes, vous devez cesser toute utilisation du service et retirer le bot de votre serveur."
    },
    {
      id: "usage",
      title: "Règles d'Utilisation",
      icon: <Scale className="w-6 h-6" />,
      content: "L'utilisation d'Engrenage est soumise au respect des Conditions d'Utilisation de Discord. Les comportements suivants sont strictement interdits :",
      list: [
        "Tenter de saturer les services du bot par du spam de commandes ou des attaques DoS.",
        "Exploiter des bugs ou des failles de sécurité sans les signaler immédiatement au support.",
        "Utiliser le bot pour diffuser du contenu illégal, haineux ou enfreignant les droits d'auteur.",
        "L'utilisation de 'self-bots' ou de scripts automatisés pour interagir avec Engrenage."
      ]
    },
    {
      id: "data",
      title: "Confidentialité & Données",
      icon: <Database className="w-6 h-6" />,
      content: "Engrenage ne collecte que les données strictement nécessaires à son fonctionnement technique :",
      list: [
        "Identifiants uniques (User ID, Server ID, Channel ID) pour la gestion des configurations.",
        "Paramètres personnalisés définis par les administrateurs du serveur.",
        "Logs temporaires des commandes pour le débogage et la prévention des abus."
      ],
      footer: "Aucune donnée n'est vendue à des tiers. Vous pouvez demander la suppression de vos données via le serveur de support."
    },
    {
      id: "availability",
      title: "Disponibilité & Responsabilité",
      icon: <HelpCircle className="w-6 h-6" />,
      content: "Le service est fourni 'en l'état'. Bien que nous fassions de notre mieux pour assurer une disponibilité maximale :",
      list: [
        "Nous ne garantissons pas un fonctionnement ininterrompu ou sans erreur.",
        "Nous nous réservons le droit de suspendre l'accès au bot (blacklist) à tout utilisateur ou serveur ne respectant pas les règles.",
        "Le développeur ne pourra être tenu responsable des pertes de données ou de modération incorrecte sur votre serveur."
      ]
    },
    {
      id: "updates",
      title: "Évolution des Termes",
      icon: <MessageSquare className="w-6 h-6" />,
      content: "Engrenage évolue constamment. Nous nous réservons le droit de modifier ces conditions à tout moment. Les changements majeurs seront annoncés sur notre serveur de support. Votre utilisation continue après modification constitue une acceptation des nouveaux termes."
    }
  ], []);

  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.list?.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopy = () => {
    navigator.clipboard.writeText("https://discord.gg/SS7v4N3S5D");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Handle scroll for "back to top" button
  if (typeof window !== "undefined") {
    window.onscroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 md:py-20 selection:bg-white selection:text-black scroll-smooth">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px]" />
      </div>

      {/* Mobile Nav Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full md:hidden text-white hover:bg-white/20 transition-all"
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {sections.map(s => (
              <button 
                key={s.id} 
                onClick={() => scrollToSection(s.id)}
                className="text-2xl font-bold text-white/70 hover:text-white transition-colors"
              >
                {s.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="w-full max-w-4xl text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-white/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="https://i.postimg.cc/zf9PbTWn/Not-Fr-Logo-engrenageom-Server.png" 
              alt="Logo Engrenage" 
              className="relative w-24 h-24 md:w-32 md:h-32 object-contain rounded-[2rem] bg-[#1a1a1a] p-4 border border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              Engrenage Bot
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-medium">
              Conditions d'Utilisation officielles
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://discord.com/oauth2/authorize?client_id=1488480317030273105&permissions=277025770560&scope=bot+applications.commands" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Inviter Engrenage
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Printer className="w-5 h-5" />
              Imprimer
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Search Bar */}
      <div className="w-full max-w-3xl mb-12 sticky top-6 z-30 px-2">
        <div className="relative group">
          <div className="absolute inset-0 bg-white/5 rounded-2xl blur-md group-focus-within:bg-white/10 transition-all" />
          <div className="relative flex items-center bg-[#161616]/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 group-focus-within:border-white/30 transition-all">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input 
              type="text" 
              placeholder="Rechercher un terme..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-gray-600 py-2"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="w-full max-w-3xl space-y-8">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <motion.section
              id={section.id}
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 md:p-10 bg-[#161616] border border-white/5 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 shadow-xl scroll-mt-24"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-2xl text-white group-hover:bg-white group-hover:text-black transition-colors duration-500">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
                <p>{section.content}</p>
                
                {section.list && (
                  <ul className="space-y-3 list-none pl-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {section.footer && (
                  <p className="pt-2 text-gray-500 italic text-base">
                    {section.footer}
                  </p>
                )}
              </div>
            </motion.section>
          ))
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun résultat trouvé pour "{searchQuery}"</p>
          </div>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2.5rem] text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Support</h2>
          <p className="text-gray-400 mb-6">
            Besoin d'aide ? Rejoignez notre serveur support ou copiez le lien :
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://discord.gg/SS7v4N3S5D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-full font-semibold transition-all group"
            >
              <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Rejoindre le serveur
            </a>
            <button 
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? "Copié !" : "Copier le lien"}
            </button>
          </div>
        </motion.section>
      </main>

      <footer className="w-full max-w-4xl mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© {currentYear} Engrenage Bot. Tous droits réservés.</p>
        <p className="mt-1">Dernière mise à jour : {lastUpdate}.</p>
      </footer>

      {/* Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 p-4 bg-white text-black rounded-full shadow-2xl hover:bg-gray-200 transition-all"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
