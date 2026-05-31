export type SectionPage = {
  slug: string;
  title: string;
  body: string;
  image?: string;
  content?: string[];
};

export type Section = {
  slug: string;
  title: string;
  description: string;
  image: string;
  links: SectionPage[];
  photos?: string[];
  content?: string[];
};

export type NewsItem = {
  title: string;
  category: string;
  date: string;
  summary: string;
};

export const sections: Section[] = [
  {
    slug: "about",
    title: "Դպրոցի մասին",
    description:
      "Դպրոցի պատմություն, հայտարարություններ, ընդունելության կարգ, թափուր աշխատատեղեր և հաշվետվությունների միասնական արխիվ։",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    content: [
      `«Արևշատի Մետաքսեի անվան միջնակարգ դպրոց»ՊՈԱԿ-ն կառուցվել է 1986 թվականին:
        Դպրոցն գտնվում է  ՀՀ  Շիրակի  մարզի  Արևշատ  համայնքում ՝փողոց 8 , շենք 5 հասցեում:
        Տնօրենի հեռախոսահամար\`094-509782:
        Դպրոց ՝ «Լինսի հիմնադրամի » կողմից  հիմնավերանորոգվել է 2010 թվականին:
        Դպրոցը՝   երկհարկանի տիպային է, ունի  սպորտ դահլիճ, խաղահրապարակ,նախակրթարան,12 դասասենյակ,համակարգչային սենյակ,14 համակարգիչ,ինտերնետ կապը առկա է,ունի
        ճաշարան, հանդիսությունների  դահլիճ, սպորտ հրապարակ:
        Շենքի ընդհանուր  մակերեսը ՝ 2976,46 քառ.մետր
        Բակային տարածքի մակերեքը ՝ 21563 քառ.մետր
        Ջեռուցման  տեսակը՝ կենտրոնացված
        Ջրամատակարարումը ՝ — շուրջօրյա կենտրոնացված
        Գազաֆիկացումը ՝ — առկա է
        Արտաքին լուսավորությունը ՝ —  առկա է
        Պարսպապատված է  ցանցով ՝ 1,5 մետր բարձրությամբ
        Աշխատակիցների թիվը 30.11.2021թ. դրությամբ\` 46,աշակերտների թիվ\`239,դասարանների թիվ\`12:
        Դպրոցը ունի  15  ներառական կրթությամբ սովորող աշակերտներ:\``
    ],
    links: [
      {
        slug: "history",
        title: "Պատմություն",
        body: "",
      },
      {
        slug: "achievements",
        title: "Հաջողություններ և պարգևներ",
        body: "",
      },
      {
        slug: "announcements",
        title: "Հայտարարություններ",
        body: "",
      },
      {
        slug: "admission",
        title: "Ընդունելության կարգ",
        body: "",
      },
      {
        slug: "vacancies",
        title: "Թափուր աշխատատեղեր",
        body: "",
      },
      {
        slug: "reports",
        title: "Հաշվետվություններ",
        body: "",
      },
      {
        slug: "license",
        title: "Լիցենզիա",
        body: "",
      },
      {
        slug: "evaluation",
        title: "Ներքին գնահատում",
        body: "",
      },
      {
        slug: "evaluationPlan",
        title: "Գնահատման ծրագիր",
        body: "",
      },
    ],
  },
  {
    slug: "councils",
    title: "Խորհուրդներ",
    description:
      "Միացյալ կառավարման, մանկավարժական, ծնողական, աշակերտական խորհուրդներ և մեթոդական միավորման արձանագրություններ։",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    links: [
      {
        slug: "joint-management",
        title: "Միացյալ կառավարման խորհուրդ",
        body: "",
      },
      {
        slug: "pedagogical",
        title: "Մանկավարժական խորհուրդ",
        body: "",
      },
      {
        slug: "parent",
        title: "Ծնողական խորհուրդ",
        body: "",
      },
      {
        slug: "student",
        title: "Աշակերտական խորհուրդ",
        body: "",
      },
      {
        slug: "methodological",
        title: "Մ/Մ արձանագրություններ",
        body: "",
      },
    ],
  },
  {
    slug: "staff",
    title: "Անձնակազմ",
    description:
      "Տնօրինություն, ուսուցչական կազմ, մասնագիտական փորձ, որակավորում և գիտական գործունեություն։",
    image: "/usucichArevshat.jpg",
    links: [
      {
        slug: "leadership",
        title: "Տնօրինություն",
        body: "",
        image: "/tnoren.jpg",
        content: [
          "Սարգիս Գևորգի Խաչատրյան  ծնվել  է 1968 թվականին Արթիկի շրջանի Գեղանիստ գյուղում:1975-85թթ. սովորել և ավարտել է Գեղանիստի միջնակարգ դպրոցը :1985թվականին ընդունվել է Երևանի Խ.Աբովյանի անվան Հայկական Պետական մանկավարժական ինստիտուտի  պատմա-աշխարհագրական ֆակուլտետի աշխարհագրության բաժինը :1986 թվականին  զորակոչվել է Խորհրդային բանակ,1988թվականին զորացրվելուց հետո շարունակել է ուսումը բուհում , որը ավարտել է 1992 թվականին ՝ ստանալով աշխարհագրություն  առարկայի ուսուցչի և դաստիրակության մեթոդիստի որակավորում:1992-93 ուստարում աշխատել է Նոր-կյանքի  միջնակարգ դպրոցում որպես աշխարհագրության ուսուցիչ,1993-95 թվականներին աշխատել է Փանիկի միջնակարգ դպրոցում որպես աշխարհագրության առարկայի ուսուցիչ,1996  թվականին տեղափոխվել է Արևշատի միջնակարգ դպրոց  որպես փոխտնօրեն՝  ուսումնադաստիրակչական աշխատանքների գծով :1997թվականից  աշխատում է Արևշատի միջնակարգ դպրոցում որպես տնօրեն :Ամուսնացած է ,ունի  երկու զավակ: հեռախոսներ՝ +374 94 50-97-82,  +374 95 01-24-68"
        ],
      },
      {
        slug: "teachers",
        title: "Ուսուցչական կազմ",
        body: "",
        image: "/usucichArevshat.jpg",
      },
      {
        slug: "qualification",
        title: "Որակավորում",
        body: "",
        image: "/usucichArevshat.jpg",
      },
      {
        slug: "research",
        title: "Գիտական գործունեություն",
        body: "",
        image: "/usucichArevshat.jpg",
      },
    ],
  },
  {
    slug: "resources",
    title: "Շենք և ռեսուրսներ",
    description:
      "Դասասենյակներ, լաբորատորիաներ, համակարգչային սենյակ, մարզադահլիճ, բուժկետ և ճաշարան։",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    photos: ["/arevshat2.png", "/arevshat3.png"],
    links: [
      {
        slug: "classrooms",
        title: "Դասասենյակներ",
        body: "",
      },
      {
        slug: "laboratories",
        title: "Լաբորատորիաներ",
        body: "",
      },
      {
        slug: "computer-room",
        title: "Համակարգչային սենյակ",
        body: "",
      },
      {
        slug: "gym",
        title: "Մարզադահլիճ",
        body: "",
      },
      {
        slug: "medical-room",
        title: "Բուժկետ",
        body: "",
      },
      {
        slug: "cafeteria",
        title: "Ճաշարան",
        body: "",
      },
    ],
  },
  {
    slug: "learning",
    title: "Ուսումնական գործընթաց",
    description:
      "Դասացուցակներ, քննություններ, ուսումնական նյութեր, դասագրքեր, կոնսպեկտներ և նախագծային աշխատանքներ։",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    links: [
      {
        slug: "exams",
        title: "Քննություններ",
        body: "",
      },
      {
        slug: "materials",
        title: "Ուսումնական նյութեր",
        body: "",
      },
      {
        slug: "projects",
        title: "Նախագծային աշխատանքներ",
        body: "",
      },
    ],
  },
  {
    slug: "events",
    title: "Դպրոցի անցուդարձ",
    description:
      "Նորություններ, միջոցառումներ, էքսկուրսիաներ, լուսանկարների պատկերասրահ և տեսանյութեր։",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    links: [
      {
        slug: "news",
        title: "Նորություններ",
        body: "",
      },
      {
        slug: "events",
        title: "Միջոցառումներ",
        body: "",
      },
    ],
  },
  {
    slug: "students",
    title: "Աշակերտներ",
    description:
      "Առաջադեմ աշակերտներ, մրցանակակիրներ, նշանավոր շրջանավարտներ և աշակերտական հաջողություններ։",
    image:
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=1200&q=80",
    links: [
      {
        slug: "advanced",
        title: "Առաջադեմ աշակերտներ",
        body: "",
      },
      {
        slug: "award-winners",
        title: "Մրցանակակիրներ",
        body: "",
      },
      {
        slug: "alumni",
        title: "Նշանավոր շրջանավարտներ",
        body: "",
      },
    ],
  },
  {
    slug: "creativity",
    title: "Ստեղծագործություններ",
    description:
      "Գրական աշխատանքներ, նկարչություն, լուսանկարչություն և ձեռքի աշխատանքներ։",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    links: [
      {
        slug: "literature",
        title: "Գրական աշխատանքներ",
        body: "",
      },
      {
        slug: "drawing",
        title: "Նկարչություն",
        body: "",
      },
      {
        slug: "photography",
        title: "Լուսանկարչություն",
        body: "",
      },
      {
        slug: "handmade",
        title: "Ձեռքի աշխատանքներ",
        body: "",
      },
    ],
  },
  {
    slug: "competitions",
    title: "Մրցույթներ",
    description:
      "Օլիմպիադաներ, շարադրությունների մրցույթներ, վիկտորինաներ և արդյունքներ։",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80",
    links: [
      {
        slug: "olympiads",
        title: "Օլիմպիադաներ",
        body: "",
      },
      {
        slug: "essays",
        title: "Շարադրությունների մրցույթներ",
        body: "",
      },
      {
        slug: "quizzes",
        title: "Վիկտորինաներ",
        body: "",
      },
    ],
  },
  {
    slug: "contact",
    title: "Կապ",
    description:
      "Հետադարձ կապի ձև, հասցե, քարտեզ, հեռախոսահամար և սոցիալական էջեր։",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    links: [
      {
        slug: "feedback",
        title: "Հետադարձ կապ",
        body: "",
      },
      {
        slug: "map",
        title: "Հասցե և քարտեզ",
        body: "",
      },
    ],
  },
];

export const news: NewsItem[] = [
  {
    title: "Հայտարարություններ",
    category: "Դպրոցի մասին",
    date: "2026",
    summary: "",
  },
  {
    title: "Հաշվետվություններ",
    category: "Դպրոցի մասին",
    date: "2018-2026",
    summary: "",
  },
  {
    title: "Միջոցառումներ",
    category: "Դպրոցի անցուդարձ",
    date: "Թարմացվող",
    summary: "",
  },
];
