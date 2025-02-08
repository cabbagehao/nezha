import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './QA.css';
import ScrollToTop from './ScrollToTop';
import Navigation from './Navigation';

interface QAItem {
  question: string;
  answer: string;
}

interface QASection {
  title: string;
  items: QAItem[];
}

const QA: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 当页面滚动超过 300px 时显示按钮
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const qaSections: QASection[] = [
    {
      title: "About Nezha 2 Movie",
      items: [
        {
          question: "When is Nezha 2 releasing?",
          answer: "Nezha 2 has a staggered global release schedule: January 29, 2025 in Mainland China, February 13, 2024 in Australia, New Zealand, Fiji, and Papua New Guinea, and February 14, 2024 in the United States and Canada. Additional markets including Singapore, Malaysia, Egypt, South Africa, Pakistan, Japan, and Korea will follow soon."
        },
        {
          question: "What's new in Nezha 2 compared to the first movie?",
          answer: "Nezha 2 features enhanced animation quality, deeper character development, and a more complex storyline. The sequel explores Nezha's growth and his relationship with Ao Bing, while introducing new characters and expanding the mythological world with spectacular action sequences and emotional depth."
        },
        {
          question: "Do I need to watch the first movie to understand Nezha 2?",
          answer: "While watching the first movie enhances the experience, Nezha 2 is designed to be accessible to new viewers. The film provides enough context and background information to understand the main characters and their relationships. However, watching the first movie will give you a deeper appreciation of the character development and story arcs."
        },
        {
          question: "How successful is Nezha 2 at the box office?",
          answer: "Nezha 2 has achieved unprecedented success at the Chinese box office, breaking multiple records to become the highest-grossing film in Chinese cinema history. The film's groundbreaking performance demonstrates the growing global appeal of Chinese animation and the enduring popularity of the Nezha mythology."
        },
        {
          question: "What makes the animation in Nezha 2 special?",
          answer: "Nezha 2 showcases cutting-edge animation technology while maintaining a distinctive artistic style inspired by traditional Chinese aesthetics. The film features fluid action sequences, detailed character expressions, and stunning visual effects that blend modern techniques with classical Chinese art elements."
        },
        {
          question: "Which characters in Nezha 2 are most praised by audiences?",
          answer: "Several characters have received exceptional praise from audiences: Ao Guang (East Sea Dragon King) for his imposing silver-armored design and spectacular water-blade techniques; Ao Run (West Sea Dragon King) as the first female dragon sovereign with unique spatial powers; Shen Gongbao for his complex character development and emotional backstory; and the dynamic between Nezha and Ao Bing, whose 'ice and fire fusion' symbolizes unity through opposition."
        },
        {
          question: "What are some notable Easter eggs and foreshadowing in the movie?",
          answer: "The film is rich with subtle details and hints: Wu Liang Xian Weng's name and actions foreshadow deeper conflicts within the immortal realm; Shen Gongbao's imprisonment suggests future plot developments; the falling of the Divine Golden Staff into the East Sea hints at potential connections to other mythological figures; and the number of golden pills being refined holds significance for future storylines."
        },
        {
          question: "What contributed to Nezha 2's record-breaking success?",
          answer: "The film's success can be attributed to several factors: cutting-edge animation featuring 1,900 special effects shots, distinctive designs for the Four Dragon Kings, integration of regional cultural elements like Sichuan-Chongqing dialects and bronze vessel patterns, compelling emotional storytelling through family relationships, and strategic release timing during the Spring Festival period."
        },
        {
          question: "What's the significance of the Groundhog characters in the film?",
          answer: "The Groundhog Legion serves as a thought-provoking element in the story, representing society's vulnerable groups. Their portrayal sparked meaningful discussions about social responsibility and justice. Their story arc, while maintaining the film's family-friendly tone, adds depth to the narrative and resonates with audiences on multiple levels."
        }
      ]
    },
    {
      title: "About Nezha Mythology",
      items: [
        {
          question: "Who is Nezha?",
          answer: "Nezha is a mythological figure from ancient Chinese folklore, first prominently featured in the Ming Dynasty novel 'Investiture of the Gods'. He is the Third Prince of Li Jing, the Pagoda-Bearing Heavenly King, and also appears in 'Journey to the West'. Born from a lotus flower, he rides on Wind Fire Wheels and is considered a protective deity in Chinese folk religion."
        },
        {
          question: "Is Nezha a child?",
          answer: "While Nezha is often depicted as a child in appearance, he is a complex divine being. In traditional mythology, he was born with extraordinary powers and wisdom beyond his years. Modern interpretations, including animations and games, often maintain his youthful appearance while exploring mature themes through his character. This contrast between his childlike appearance and divine nature creates an interesting dynamic that has fascinated audiences for generations."
        },
        {
          question: "What are Nezha's main magical weapons?",
          answer: "Nezha wields several powerful magical weapons: the Wind Fire Wheels (for high-speed movement), the Universe Ring (for ranged attacks), the Red Armillary Sash (for binding enemies), and the Fire-Tipped Spear (his primary weapon). Each of these artifacts enhances his combat abilities and helps him maintain cosmic order."
        },
        {
          question: "What is Nezha's most famous story?",
          answer: "The most famous tale is 'Nezha Stirs Up the Sea', where he defeats Ao Bing, the Third Prince of the East Sea Dragon King. This conflict leads to a feud with the Dragon King, culminating in Nezha's ultimate sacrifice - cutting out his flesh to return it to his mother and his bones to his father. He is later reborn through a lotus flower by his master, Taiyi Zhenren."
        },
        {
          question: "Is Nezha a Buddhist or Taoist deity?",
          answer: "Nezha's character represents a fusion of Taoist, Buddhist, and folk beliefs. In Taoism, he serves as a protective deity, while in Buddhism, he is recognized as one of the guardian deities of Buddha, known as 'Prince Nezha'. This syncretism reflects the complex interweaving of Chinese religious traditions."
        },
        {
          question: "What are some classic Nezha adaptations in media?",
          answer: "Notable adaptations include the 1979 classic animation 'Nezha Conquers the Dragon King', the 2019 blockbuster 'Ne Zha', various television series, and numerous game adaptations. Each adaptation brings its own interpretation while maintaining the core elements of Nezha's character and mythology."
        },
        {
          question: "What games feature Nezha?",
          answer: "Nezha appears in various video games across different genres. Notable examples include 'SMITE' where he's a playable deity, 'Warriors Orochi 4' as a powerful character, and 'Puzzle & Dragons' as a collectible hero. He's also featured in mobile games like 'Honor of Kings' and 'Mobile Legends: Bang Bang'. Many Chinese MMORPGs incorporate Nezha as either a playable character or a significant story figure, showcasing his enduring popularity in gaming culture."
        }
      ]
    }
  ];

  return (
    <div className="qa-container">
      <Navigation />
      
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover more about Nezha 2
          </p>

          {qaSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="qa-section">
              <h3 className="section-title">{section.title}</h3>
              <div className="qa-list">
                {section.items.map((item, index) => (
                  <div key={index} className="qa-item">
                    <h4>{item.question}</h4>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default QA; 