import React, { useState, useEffect } from 'react';
import { Maximize2, X } from 'lucide-react';
import './CharacterGuide.css';
import ScrollToTop from './ScrollToTop';
import Navigation from './Navigation';

interface Character {
  name: string;
  description: string;
  traits: string[];
  image?: string;
}

const CharacterGuide: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const characters = {
    mainCharacters: [
      {
        name: "Nezha",
        description: "The iconic protagonist returns with enhanced character depth. While maintaining his rebellious spirit, he now shows more emotional complexity through self-reflection and witty self-deprecation. His combat style combines traditional divine weapons with innovative techniques.",
        traits: ["Rebellious", "Complex", "Divine Warrior", "Witty"],
        image: "/post_images/nezha.webp"
      },
      {
        name: "Ao Bing",
        description: "The Dragon Prince whose friendship with Nezha transcends ancient conflicts. His character design emphasizes his dragon heritage through azure-scaled armor and flowing silver hair, while his personality balances royal dignity with genuine warmth.",
        traits: ["Noble", "Loyal Friend", "Dragon Prince", "Balanced"],
        image: "/post_images/aobing.webp"
      },
      {
        name: "Li Jing",
        description: "Commander of Chen Tang Pass and Nezha's father. His new armor design incorporates ancient Chinese bronze aesthetics with Taotie motifs, symbolizing both protection and authority. His character arc explores the balance between duty and family.",
        traits: ["Commander", "Protective Father", "Warrior", "Dutiful"],
        image: "/post_images/lijing.webp"
      },
      {
        name: "Lady Yin",
        description: "A formidable female general whose role expands significantly in the sequel. Her combat-oriented armor design reflects her military prowess, while her character development emphasizes both martial strength and maternal wisdom.",
        traits: ["General", "Warrior Mother", "Strategist", "Fierce"],
        image: "/post_images/yinfuren.webp"
      }
    ],
    dragonKings: [
      {
        name: "Ao Guang (East Sea Dragon King)",
        description: "The sovereign of the East Sea, whose mastery over water manifests in spectacular combat sequences. His design combines traditional dragon king imagery with modern elemental effects, featuring silver-scaled armor and fluid combat animations.",
        traits: ["Sovereign", "Water Master", "Imposing", "Strategic"],
        image: "/post_images/aoguang.webp"
      },
      {
        name: "Ao Shun (North Sea Dragon King)",
        description: "A lethal assassin-type dragon king whose blade-covered armor reflects his combat style. His unique design features reverse-jointed armor plates and retractable blades, creating a distinctive silhouette during battle sequences.",
        traits: ["Assassin", "Blade Master", "Agile", "Deadly"],
        image: "/post_images/aoshun.webp"
      },
      {
        name: "Ao Qin (South Sea Dragon King)",
        description: "The embodiment of volcanic might, whose armor incorporates magma patterns and flame motifs. His character depth comes from a complex motivation that challenges the traditional antagonist role, backed by impressive fire-based combat abilities.",
        traits: ["Fire Wielder", "Powerful", "Complex", "Intimidating"],
        image: "/post_images/aoqin.webp"
      },
      {
        name: "Ao Run (West Sea Dragon King)",
        description: "A sophisticated female dragon king whose design draws from traditional Eastern supernatural beings. Her character combines elegant aesthetics with deadly spatial manipulation powers, featuring intricate costume details inspired by ancient Chinese mythology.",
        traits: ["Enchantress", "Space Manipulator", "Mysterious", "Refined"],
        image: "/post_images/aorun.webp"
      }
    ],
    supportingCharacters: [
      {
        name: "Shen Gongbao",
        description: "A shapeshifting leopard spirit whose character brings both comedy and intrigue. His design cleverly incorporates leopard motifs into traditional Taoist robes, while his stuttering speech contrasts with his scheming nature.",
        traits: ["Shapeshifter", "Trickster", "Complex", "Enigmatic"],
        image: "/post_images/shengongbao.webp"
      },
      {
        name: "Boundary Beast",
        description: "Inspired by Sanxingdui archaeological findings, this guardian's design authentically recreates ancient bronze artwork in 3D form. Despite its imposing appearance, its endearing personality has made it a beloved character.",
        traits: ["Ancient Guardian", "Gentle Giant", "Cultural Icon", "Loyal"]
      },
      {
        name: "Tai Yi Zhenren",
        description: "A powerful Taoist master whose character embodies Sichuan cultural elements. His pig-riding imagery and regional dialect create a unique blend of divine authority and local charm, making him both respected and approachable.",
        traits: ["Divine Master", "Wise Teacher", "Cultural Symbol", "Humorous"],
        image: "/post_images/taiyi.webp"
      },
      {
        name: "Deer Child & Crane Child",
        description: "Mysterious disciples whose designs blend Taoist mysticism with animal attributes. Their presence adds depth to the mythological world, while their connection to Shen Gongbao suggests deeper plot implications.",
        traits: ["Mystic Disciples", "Enigmatic", "Divine Servants", "Connected"]
      }
    ]
  };

  const CharacterCard = ({ char }: { char: Character }) => (
    <div key={char.name} className="character-card">
      {char.image && (
        <div className="character-image">
          <img 
            src={char.image} 
            alt={`${char.name} - Character from Nezha 2 Movie`} 
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button 
            className="expand-image-button"
            onClick={() => setSelectedImage(char.image)}
            aria-label={`View full image of ${char.name}`}
          >
            <Maximize2 size={20} />
          </button>
        </div>
      )}
      <div className="character-content">
        <h4>{char.name}</h4>
        <p>{char.description}</p>
        <div className="traits">
          {char.traits.map(trait => (
            <span key={trait} className="trait-tag">{trait}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="character-guide">
      <Navigation />
      
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-3">Character Guide</h1>
          <p className="text-lg text-gray-300 mb-8">
            Meet the legendary characters from Nezha 2
          </p>

          <section className="character-section">
            <h3>Main Characters</h3>
            <div className="character-grid">
              {characters.mainCharacters.map(char => (
                <CharacterCard key={char.name} char={char} />
              ))}
            </div>
          </section>

          <section className="character-section">
            <h3>Dragon Kings</h3>
            <div className="character-grid">
              {characters.dragonKings.map(char => (
                <CharacterCard key={char.name} char={char} />
              ))}
            </div>
          </section>

          <section className="character-section">
            <h3>Supporting Characters</h3>
            <div className="character-grid">
              {characters.supportingCharacters.map(char => (
                <CharacterCard key={char.name} char={char} />
              ))}
            </div>
          </section>

          {/* Image Modal */}
          {selectedImage && (
            <div className="image-modal" onClick={() => setSelectedImage(null)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button 
                  className="close-button"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close image"
                >
                  <X size={24} />
                </button>
                <img 
                  src={selectedImage} 
                  alt={`Full view of ${characters.mainCharacters
                    .concat(characters.dragonKings)
                    .concat(characters.supportingCharacters)
                    .find(char => char.image === selectedImage)?.name || 'character'} from Nezha 2`} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default CharacterGuide; 