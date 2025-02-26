'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface Value {
  id: string;
  title: string;
  description: {
    intro: string;
    points: {
      title: string;
      text: string;
    }[];
  };
  icon: string;
}

const values: Value[] = [
  {
    id: 'ramybe',
    title: 'RAMYBĖ – UŽTIKRINTAS DAIKTŲ SAUGUMAS',
    description: {
      intro: 'Vienas svarbiausių aspektų kraustantis ar transportuojant daiktus yra saugumas. Mes žinome, kokią reikšmę Jūsų turtas turi Jums, todėl užtikriname:',
      points: [
        {
          title: 'Atsakingą požiūrį',
          text: 'Mūsų komanda pasirūpina tinkamu daiktų paruošimu ir pakrovimu bei sklandžiu transportavimo procesu.'
        },
        {
          title: 'Patirtį',
          text: 'Turime daugiau nei 9 000 sėkmingai įgyvendintų projektų patirtį. Dėl mažos darbuotojų kaitos nuolatos išlaikome stabiliai profesionalią komandą.'
        },
        {
          title: 'Efektyvumą',
          text: 'Prireikus, darbus galime pradėti vos per 1–3 dienas. Kiekvieną užduotį atliekame operatyviai, kad Jūs kuo greičiau džiaugtumėtės sklandžiai atliktu perkraustymu ar transportavimo projektu.'
        },
        {
          title: 'Dedikuotą kontaktinį asmenį',
          text: 'Nuo pat paslaugos užsakymo iki galutinio užbaigimo Jums bus paskirtas vienas atsakingas asmuo, kuris atsakys į visus klausimus ir suderins darbus taip, kad procesas vyktų be rūpesčių.'
        },
        {
          title: 'Papildomas paslaugas',
          text: 'Jei reikia, supakuosime ir išpakuosime Jūsų daiktus, parūpinsime pakuotes, apsaugines medžiagas ir kitus reikalingus sprendimus.'
        }
      ]
    },
    icon: '/images/icons/ramybe.png'
  },
  {
    id: 'patogumas',
    title: 'PATOGUMAS – GREITOS IR KLIENTUI PRITAIKYTAS PASLAUGOS',
    description: {
      intro: 'Laikas – brangus išteklius, todėl mes siekiame padėti Jums jį maksimaliai taupyti:',
      points: [
        {
          title: 'Greitas paslaugų užsakymas',
          text: 'Dirbame 24/7 režimu, todėl operatyviai reaguojame į Jūsų užklausas, o darbus galime pradėti per 1–3 dienas.'
        },
        {
          title: 'Paslaugų lankstumas',
          text: 'Norėdami pasiūlyti patogų laiką, dirbame ne tik įprastomis darbo dienomis, bet ir savaitgaliais bei švenčių dienomis.'
        },
        {
          title: 'Viskas vienoje vietoje',
          text: 'Nuo A iki Z pasirūpiname visu kraustymo ar logistikos procesu – nuo parengiamųjų darbų iki baigiamojo daiktų sustatymo.'
        }
      ]
    },
    icon: '/images/icons/patogumas.png'
  },
  {
    id: 'rizikos',
    title: 'RIZIKOS MAŽINIMAS – ATSAKINGAS POŽIŪRIS Į JŪSŲ TURTĄ',
    description: {
      intro: 'Mūsų misija – ne tik greitai ir kokybiškai suteikti paslaugas, bet ir užtikrinti, kad viskas vyktų kuo saugiau:',
      points: [
        {
          title: 'Profesionali įranga',
          text: 'Krovimo technika, apsauginės medžiagos ir transporto priemonės leidžia apsaugoti daiktus nuo galimų pažeidimų.'
        },
        {
          title: 'Draudimas',
          text: 'Jei vis dėlto kas nors nutiktų, mes galime pasirūpinti draudimu, užtikrinančiu Jūsų daiktų saugumą.'
        },
        {
          title: 'Rizikų įvertinimas',
          text: 'Mūsų komanda prieš kiekvieną projektą įvertina galimas rizikas ir parenka tinkamiausius sprendimus, kad šių rizikų išvengtume.'
        }
      ]
    },
    icon: '/images/icons/rizikos-mazinimas.png'
  },
  {
    id: 'estetiskumas',
    title: 'ESTETIŠKUMAS – TVARKINGAS IR PROFESIONALUS ĮVAIZDIS',
    description: {
      intro: 'Patikima įmonė – tai ne tik punktualūs ir saugūs sprendimai, bet ir tvarkinga darbo aplinka. "Mes Jau Čia" komanda:',
      points: [
        {
          title: 'Naudoja švarią darbo aprangą ir įrangą',
          text: 'Nuo vairuotojų iki krovėjų, visi mūsų komandos nariai laikosi tvarkos ir higienos standartų.'
        },
        {
          title: 'Yra kultūringi',
          text: 'Gerbiame tiek Jūsų, tiek aplinkinių erdvę, todėl dirbdami siekiame kuo mažiau trukdyti ir išlaikyti darbų teritoriją švarią.'
        },
        {
          title: 'Naudoja tvarkingas transporto priemones',
          text: 'Transporto priemonės yra reguliariai prižiūrimos ir valomos, kad atvyktume pas Jus visuomet pasirengę profesionaliai atlikti užduotis.'
        }
      ]
    },
    icon: '/images/icons/estetiskumas.png'
  },
  {
    id: 'pritaikymas',
    title: 'ASMENINIS PRITAIKYMAS – LANKSČIAI SPRENDŽIAME BET KOKIĄ UŽDUOTĮ',
    description: {
      intro: 'Ne visos logistikos užduotys yra vienodos. Vieni klientai turi nedidelį kiekį daiktų, kiti – sudėtingus, nestandartinius krovinius. Mūsų stiprybė – gebėjimas:',
      points: [
        {
          title: 'Individualus pritaikymas',
          text: 'Priderinti paslaugas prie Jūsų individualių poreikių ir situacijos.'
        },
        {
          title: 'Valdyti įvairią techniką',
          text: 'Nuo mikroautobusų iki galingų sunkiasvorių sunkvežimių su manipuliatoriais (fiskarais) – turime viską, ko reikia.'
        },
        {
          title: 'Išspręsti sudėtingus projektus',
          text: 'Didelė patirtis ir entuziastinga komanda leidžia nebijoti didelių iššūkių ar neįprastų krovinių.'
        }
      ]
    },
    icon: '/images/icons/asmeninis-pritaikymas.png'
  },
  {
    id: 'kompleksiskumas',
    title: 'KOMPLEKSIŠKAS PASLAUGŲ TEIKIMAS – VISKAS VIENOJE VIETOJE',
    description: {
      intro: 'Nesvarbu, ar Jums reikia paprastos krovimo paslaugos, ar pilno logistikos sprendimo – "Mes Jau Čia" gali tai pasiūlyti:',
      points: [
        {
          title: 'Krovimo paslaugos',
          text: 'Pakrauname ir iškrauname įvairius krovinius, naudodami profesionalią įrangą.'
        },
        {
          title: 'Perkraustymas',
          text: 'Atliekame tiek nedidelius, tiek stambius gyvenamųjų patalpų ir biurų perkraustymus.'
        },
        {
          title: 'Sunkių daiktų pervežimas',
          text: 'Pianinai, seifai, stambi gamybinė įranga – turime reikalingus įrankius ir žinias tokioms užduotims.'
        },
        {
          title: 'Negabaritinių krovinių transportavimas',
          text: 'Logistikos sprendimai sudėtingiems, nestandartinio dydžio kroviniams.'
        },
        {
          title: 'Fiskaro nuoma',
          text: 'Savo krovimo techniką nuomojame su profesionaliais operatoriais, kad darbus atliktumėte lengvai ir be rūpesčių.'
        },
        {
          title: 'Renginių aptarnavimas',
          text: 'Pervežame scenos įrangą, baldus, dekoracijas ir visa kita, ko reikia sklandžiai Jūsų renginio eigai.'
        },
        {
          title: 'Baldų montavimas',
          text: 'Jei reikia, surinksime ir pastatysime Jūsų baldus naujoje vietoje.'
        },
        {
          title: 'Atliekų išvežimas',
          text: 'Saugiai ir atsakingai išvežame senus baldus, pakavimo atliekas, statybines liekanas ar kitus nereikalingus daiktus.'
        }
      ]
    },
    icon: '/images/icons/kompleksiskas-paslaugu-teikimas.png'
  },
  {
    id: 'kokybe',
    title: 'AUKŠTA KOKYBĖ – PROFESIONALUMAS KIEKVIENAME ŽINGSNYJE',
    description: {
      intro: '„Mes Jau Čia" siekia užtikrinti, kad kiekviena paslauga, pradedant pirminiu užsakymu ir baigiant galutiniu rezultatų patikrinimu, būtų atlikta nepriekaištingai:',
      points: [
        {
          title: 'Specializuota įranga',
          text: 'Naudojame modernias priemones ir krovininius automobilius, pritaikytus įvairaus tipo kroviniams.'
        },
        {
          title: 'Ilgametė patirtis',
          text: 'Daugiau nei 9 000 sėkmingų projektų su ta pačia, stipria ir mažai kintančia komanda.'
        },
        {
          title: 'Atsakingumas',
          text: 'Dar prieš pradedant darbus įvertiname visus galimus netikėtumus, pasiūlome sprendimus ir taikome aukštus kokybės standartus.'
        }
      ]
    },
    icon: '/images/icons/auksta-kokybe.png'
  },
  {
    id: 'prieinamumas',
    title: 'PRIEINAMUMAS – VISADA ŠALIA JŪSŲ',
    description: {
      intro: 'Mūsų tikslas – būti pasiekiami tada, kai Jums to labiausiai reikia:',
      points: [
        {
          title: '24/7 darbo laikas',
          text: 'Suprantame, kad gyvenime nutinka įvairių netikėtumų, todėl dirbame savaitgaliais ir švenčių dienomis.'
        },
        {
          title: 'Geografinė aprėptis',
          text: 'Teikiame paslaugas visoje Lietuvoje bei tarptautiniu mastu. Jei planuojate krovinius perkelti į užsienį ar iš ten, mielai padėsime sudėlioti reikiamus logistikos maršrutus.'
        },
        {
          title: 'Įvairūs užsakymo kanalai',
          text: 'Susisiekti galite telefonu, el. paštu, per mūsų svetainę ar socialinius tinklus. Operatyviai reaguojame į užklausas ir stengiamės kiek įmanoma greičiau pasiūlyti tinkamiausią sprendimą.'
        }
      ]
    },
    icon: '/images/icons/prieinamumas.png'
  },
  {
    id: 'laikas',
    title: 'LAIKO TAUPYMAS – GREITIS IR EFEKTYVUMAS',
    description: {
      intro: 'Planuodami savo veiklą, orientuojamės į klientų patogumą:',
      points: [
        {
          title: 'Profesionalios darbo priemonės',
          text: 'Techninė bazė ir įranga užtikrina, kad daiktai būtų greitai pakrauti, pergabenti ir iškrauti.'
        },
        {
          title: 'Gausi komanda',
          text: 'Didelis darbuotojų skaičius leidžia operatyviai įvykdyti net kelis projektus vienu metu, jei to reikalauja situacija.'
        },
        {
          title: 'Darbas savaitgaliais ir švenčių dienomis',
          text: 'Jei biuro ar namų perkraustymą galite atlikti tik ne darbo dienomis, esame tam pasirengę – taip netrukdysime Jūsų įprastai veiklai.'
        }
      ]
    },
    icon: '/images/icons/laiko-taupymas.png'
  }
];

const ValuesSection = ({ inView }: { inView: boolean }) => {
  const [activeValue, setActiveValue] = useState(values[0].id);

  const selectedValue = values.find(v => v.id === activeValue);

  return (
    <div className="container mx-auto px-4 py-16 pt-20">
      <motion.h2
        className="text-4xl font-light text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[#2A2D35]">MŪSŲ </span>
        <span className="text-[#BB0003]">VERTYBĖS</span>
        <span className="text-[#2A2D35]"> IR IŠSKIRTINUMAI</span>
      </motion.h2>

      <div className="max-w-4xl mx-auto flex gap-6">
        {/* Values list */}
        <div className="w-[60%]">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              className={`rounded-lg p-4 mb-3.5 flex items-center gap-4 cursor-pointer transition-colors
                ${activeValue === value.id 
                  ? 'bg-[#BB0003]' 
                  : 'bg-white hover:bg-white/80'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setActiveValue(value.id)}
            >
              <div className="w-5 h-5 relative flex-shrink-0">
                <Image
                  src={value.icon}
                  alt={value.title}
                  fill
                  className={`object-contain transition-all
                    ${activeValue === value.id ? 'brightness-0 invert' : ''}`}
                />
              </div>
              <h3 className={`text-xs leading-tight transition-colors
                ${activeValue === value.id ? 'text-white' : 'text-[#232323]'}`}>
                <span className="font-bold">{value.title.split('–')[0]}</span>
                {value.title.includes('–') && '–'}
                <span className="font-normal">{value.title.split('–')[1]}</span>
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Description box */}
        <motion.div 
          className="w-[40%] bg-gray-200/90 backdrop-blur-[2px] rounded-lg p-5 max-h-[600px] overflow-y-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          key={activeValue}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-bold text-[#2A2D35] mb-3">{selectedValue?.title}</h3>
            <p className="text-gray-700 text-xs mb-3">{selectedValue?.description.intro}</p>
            <div className="space-y-2">
              {selectedValue?.description.points.map((point, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-[#BB0003] mt-0.5 text-xs">•</div>
                  <div className="text-xs">
                    <span className="font-bold text-[#2A2D35]">{point.title}: </span>
                    <span className="text-gray-700">{point.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ValuesSection; 