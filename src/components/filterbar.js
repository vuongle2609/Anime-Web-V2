import React, { useEffect, useState } from 'react'

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice Of Life",
  "Sports",
  "Supernatural",
  "Thriller",
  "Anti-Hero",
  "Ensemble Cast",
  "Female Protagonist",
  "Male Protagonist",
  "Office Lady",
  "Primarily Adult Cast",
  "Primarily Child Cast",
  "Primarily Female Cast",
  "Primarily Male Cast",
  "Villainess",
  "Age Regression",
  "Agender",
  "Aliens",
  "Amnesia",
  "Artificial Intelligence",
  "Asexual",
  "Butler",
  "Centaur",
  "Chimera",
  "Chuunibyou",
  "Cosplay",
  "Crossdressing",
  "Delinquents",
  "Demons",
  "Detective",
  "Dinosaurs",
  "Dissociative Identities",
  "Dragons",
  "Dullahan",
  "Elf",
  "Ghost",
  "Goblin",
  "Gods",
  "Gyaru",
  "Hikikomori",
  "Idol",
  "Kemonomimi",
  "Kuudere",
  "Maids",
  "Mermaid",
  "Monster Girl",
  "Nekomimi",
  "Ninja",
  "Nudity",
  "Nun",
  "Oiran",
  "Ojou-Sama",
  "Pirates",
  "Robots",
  "Samurai",
  "Shrine Maiden",
  "Skeleton",
  "Succubus",
  "Tanned Skin",
  "Teacher",
  "Tsundere",
  "Twins",
  "Vampire",
  "Vikings",
  "Werewolf",
  "Witch",
  "Yandere",
  "Zombie",
  "Josei",
  "Kids",
  "Seinen",
  "Shoujo",
  "Shounen",
  "Bar",
  "Circus",
  "College",
  "Dungeon",
  "Foreign",
  "Language Barrier",
  "Outdoor",
  "Rural",
  "School",
  "School Club",
  "Urban",
  "Work",
  "Achronological Order",
  "Anachronism",
  "Dystopian",
  "Historical",
  "Time Skip",
  "Afterlife",
  "Alternate Universe",
  "Augmented Reality",
  "Post-Apocalyptic",
  "Space",
  "Urban Fantasy",
  "Virtual World",
  "4-Koma",
  "Achromatic",
  "Advertisement",
  "Anthology",
  "CGI",
  "Episodic",
  "Flash",
  "Full CGI",
  "Full Color",
  "No Dialogue",
  "POV",
  "Puppetry",
  "Rotoscoping",
  "Stop Motion",
  "Archery",
  "Battle Royale",
  "Espionage",
  "Fugitive",
  "Guns",
  "Martial Arts",
  "Swordplay",
  "Acting",
  "Calligraphy",
  "Classic Literature",
  "Drawing",
  "Fashion",
  "Food",
  "Photography",
  "Rakugo",
  "Writing",
  "Band",
  "Dancing",
  "Musical",
  "Parody",
  "Satire",
  "Slapstick",
  "Surreal Comedy",
  "Bullying",
  "Coming Of Age",
  "Conspiracy",
  "Rehabilitation",
  "Revenge",
  "Tragedy",
  "Body Swapping",
  "Cultivation",
  "Fairy Tale",
  "Henshin",
  "Isekai",
  "Kaiju",
  "Magic",
  "Mythology",
  "Shapeshifting",
  "Steampunk",
  "Super Power",
  "Superhero",
  "Wuxia",
  "Youkai",
  "Video Games",
  "Card Battle",
  "Go",
  "Karuta",
  "Mahjong",
  "Poker",
  "Shogi",
  "Airsoft",
  "American Football",
  "Athletics",
  "Badminton",
  "Baseball",
  "Basketball",
  "Boxing",
  "Cheerleading",
  "Cycling",
  "Fishing",
  "Fitness",
  "Football",
  "Golf",
  "Ice Skating",
  "Lacrosse",
  "Rugby",
  "Scuba Diving",
  "Skateboarding",
  "Surfing",
  "Swimming",
  "Table Tennis",
  "Tennis",
  "Volleyball",
  "Wrestling",
  "Animals",
  "Astronomy",
  "Autobiographical",
  "Biographical",
  "Body Horror",
  "Cannibalism",
  "Chibi",
  "Cosmic Horror",
  "Crime",
  "Crossover",
  "Death Game",
  "Denpa",
  "Drugs",
  "Economics",
  "Educational",
  "Environmental",
  "Ero Guro",
  "Gambling",
  "Gender Bending",
  "Gore",
  "LGBTQ+ Themes",
  "Lost Civilization",
  "Medicine",
  "Memory Manipulation",
  "Meta",
  "Noir",
  "Otaku Culture",
  "Pandemic",
  "Philosophy",
  "Politics",
  "Reincarnation",
  "Slavery",
  "Software Development",
  "Survival",
  "Terrorism",
  "War",
  "Assassins",
  "Cult",
  "Firefighters",
  "Gangs",
  "Mafia",
  "Military",
  "Police",
  "Triads",
  "Yakuza",
  "Aviation",
  "Cars",
  "Mopeds",
  "Motorcycles",
  "Ships",
  "Tanks",
  "Trains",
  "Age Gap",
  "Bisexual",
  "Boys' Love",
  "Harem",
  "Love Triangle",
  "Reverse Harem",
  "Teens' Love",
  "Yuri",
  "Cyberpunk",
  "Space Opera",
  "Time Manipulation",
  "Tokusatsu",
  "Real Robot",
  "Super Robot",
  "Cute Girls Doing Cute Things",
  "Family Life",
  "Iyashikei"
]

function FilterBar() {
  const [btnG, setBtnG] = useState(true)
  const [btnF, setBtnF] = useState(true)
  const [btnS, setBtnS] = useState(true)

  useEffect(() => {
    document.querySelector('#arrow-genre').onclick = () => {
      document.querySelector('#list-genre').classList.toggle('active')
      setBtnG(!btnG)
    }

    document.querySelector('#arrow-filter').onclick = () => {
      document.querySelector('#list-filter').classList.toggle('active')
      setBtnF(!btnF)
    }

    document.querySelector('#arrow-season').onclick = () => {
      document.querySelector('#list-season').classList.toggle('active')
      setBtnS(!btnS)
    }
  },[btnG, btnF, btnS])

  return (
    <>
      <div className="left-bar">
        <div className="category">
          <span className="active">Filter</span>
          <span className="">Collection</span>
          <span className="">History</span>
        </div>
        <div className="search-box">
          <box-icon name='search' color='#9e9ea8' ></box-icon>
          <input type="text" placeholder="Search your anime here"/>
        </div>
        <div className="selection">
            <div>
              <span>Genres</span>
              <box-icon name={btnG ? 'chevron-up' : 'chevron-down'} id="arrow-genre" type="solid" color="#ffffff"></box-icon>
            </div> 
            <ul className="" id="list-genre">
              {genres.sort().map((genre, index) => {
                  return (
                    <li htmlFor={`check${index}`} key={index}>
                      <input type="checkbox" id={`check${index}`}/>
                      <label htmlFor={`check${index}`}>{genre}</label>
                    </li>
                  )
              })}
            </ul>
        </div>
        <div className="status">
          <div>
            <span>Status</span>
            <box-icon name={btnF ? 'chevron-up' : 'chevron-down'} id="arrow-filter" type="solid" color="#ffffff"></box-icon>
          </div> 
          <ul className="" id="list-filter">
            <li>
              <input className="filter-check" type="radio" name="status" id='check-status-0'/>
              <label htmlFor='check-status-0'>
              Finished
              </label>
            </li>
            <li>
              <input className="filter-check" type="radio" name="status" id='check-status-1'/>
              <label htmlFor='check-status-1'>
              Ongoing
              </label>
            </li>
            <li>
              <input className="filter-check" type="radio" name="status" id='check-status-2'/>
              <label htmlFor='check-status-2'>
              Upcoming
              </label>
            </li>
            <li>
              <input className="filter-check" type="radio" name="status" id='check-status-3'/>
              <label htmlFor='check-status-3'>
              Cancelled
              </label>
            </li>
          </ul>
        </div>
        <div className="season">
          <div>
            <span>Season</span>
            <box-icon name={btnS ? 'chevron-up' : 'chevron-down'} id="arrow-season" type="solid" color="#ffffff"></box-icon>
          </div> 
          <ul className="" id="list-season">
            <li key="0">
              <input className="season-check" type="radio" name="season" id='check-season-0'/>
              <label htmlFor='check-season-0'>
              Winter
              </label>
            </li>
            <li key="1">
              <input className="season-check" type="radio" name="season" id='check-season-1'/>
              <label htmlFor='check-season-1'>
              Spring
              </label>
            </li>
            <li key="2">
              <input className="season-check" type="radio" name="season" id='check-season-2'/>
              <label htmlFor='check-season-2'>
              Summer
              </label>
            </li>
            <li key="3">
              <input className="season-check" type="radio" name="season" id='check-season-3'/>
              <label htmlFor='check-season-3'>
              Fall
              </label>
            </li>
          </ul>
        </div>
        <div className="apply">
          <span>Apply filter</span>
        </div>
      </div>

    </>
  );
}

export default FilterBar;
