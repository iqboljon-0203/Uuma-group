export type Language = "uz" | "ru" | "en";

export const translations = {
  uz: {
    seo: {
      title: "Uuma Group | Premium maishiy kimyo",
      description: "Habfer va Jieti brendlari - uyingizda mukammal tozalik va xushbo'y ifor yaratishingiz uchun. Premium sifat, ayollar uchun maxsus ishlab chiqilgan.",
    },
    nav: {
      home: "Bosh sahifa",
      catalog: "Katalog",
      about: "Biz haqimizda",
      cart: "Savat",
      faq: "Savollar",
    },
    hero: {
      tagline: "Premium sifatli tozalash vositalari",
      title: "Uuma Group",
      subtitle: "Ayollar uchun uy mahsulotlari",
      desc: "Habfer va Jieti brendlari bilan uyingizda mukammal tozalik va xushbo'y iforni yarating. Premium sifatli maishiy kimyo mahsulotlari.",
      cta: "Katalogni ko'rish",
      stats: {
        products: "Mahsulotlar",
        customers: "Mijozlar",
        quality: "Sifat kafolati",
      }
    },
    trust: {
      tagline: "Nima uchun Uuma Group?",
      title: "Ishonchingiz biz uchun muhim",
      delivery: "Tezkor yetkazib berish",
      deliveryDesc: "Toshkent bo'ylab 24 soat ichida yetkaziladi",
      guarantee: "Sifat kafolati",
      guaranteeDesc: "100% original va sertifikatlangan mahsulotlar",
      support: "24/7 yordam",
      supportDesc: "Telegram orqali istalgan vaqtda aloqa",
      premium: "Premium daraja",
      premiumDesc: "Habfer va Jieti: Premium maishiy kimyo",
    },
    categories: {
      tagline: "Kategoriyalar",
      title: "Mahsulot turlari",
      liquid: "Suyuq mahsulotlar",
      liquidDesc: "Gellar, sovunlar va yuvish vositalari",
      capsules: "Kapsula va granulalar",
      capsulesDesc: "Xushbo'ylantirgichlar va yuvish kapsulalari",
      household: "Ro'zg'or buyumlari",
      householdDesc: "Savatlar va uy-ro'zg'or jihozlari",
    },
    featured: {
      tagline: "Eng yaxshilar",
      title: "Mashhur mahsulotlar",
      viewAll: "Hammasini ko'rish",
    },
    catalog: {
      showroom: "Showroom",
      title: "Mahsulotlar katalogi",
      all: "Barchasi",
      searchPlaceholder: "Mahsulotlarni qidirish...",
      empty: "Mahsulotlar topilmadi.",
      brands: "Brendlar",
      resultsLabel: "ta mahsulot topildi",
      categoryLabel: "Kategoriyalar",
      sort: {
        label: "Saralash",
        newest: "Yangilari avval",
        priceLow: "Arzonlari avval",
        priceHigh: "Qimmatlari avval",
      }
    },
    cart: {
      title: "Sizning savatingiz",
      empty: "Savatingiz hozircha bo'sh.",
      toCatalog: "Xarid qilishda davom eting",
      summary: "Buyurtma hisobi",
      total: "Jami",
      viewCart: "Savatni ko'rish",
      checkout: "Buyurtma berish",
      remove: "O'chirish",
      items: "mahsulot",
      currency: "so'm",
    },
    footer: {
      desc: "Premium maishiy kimyo mahsulotlari ishlab chiqaruvchisi. Biz uyingizda mukammal tozalik va xushbo'y iforni yaratish uchun yuqori sifatli Habfer va Jieti mahsulotlarini taklif etamiz.",
      pages: "Sahifalar",
      categories: "Kategoriyalar",
      contact: "Aloqa",
      address: "Toshkent sh., Mirobod tumani",
      workHours: "Ish tartibi: 09:00 - 18:00 (Du - Sha)",
      allRights: "Barcha huquqlar himoyalangan.",
    },
    product: {
      addToCart: "Savatga",
      added: "savatga qo'shildi",
      badges: {
        premium: "Premium",
        bestSeller: "Xit sotuv",
        new: "Yangi",
        scented: "Eng xushbo'y",
      },
      names: {
        belizna: "Belizna: Oqartiruvchi",
        soap: "Suyuq sovun: Dengiz",
        basket: "Premium Saqlash Savati",
      },
      related: "O'xshash mahsulotlar",
      usage: "Qo'llanilishi",
      categoryLabel: "Turkum",
      recent: "Siz ko'rgan mahsulotlar",
    },
    testimonials: {
      tagline: "Mijozlarimiz fikri",
      title: "Sifatimiz haqida nima deyishadi?",
      items: [
        {
          name: "Malika Akromova",
          role: "Uy bekasi",
          text: "Habfer gellarini ishlatib ko'rdim, hidiga gap yo'q! Kiyimlar juda yumshoq va toza chiqadi. Endi faqat shu mahsulotni olaman.",
        },
        {
          name: "Sitora Ismoilova",
          role: "Bloger",
          text: "Jieti mahsulotlari haqiqiy topilma bo'ldi. Ayniqsa oshxona uchun tozalash vositalari effektidan hayratda qoldim. Tavsiya qilaman!",
        },
        {
          name: "Dildora Rahimova",
          role: "Ishbilarmon ayol",
          text: "Premium sifat va chiroyli dizayn. Uuma Group mahsulotlari nafaqat yaxshi tozalaydi, balki uyga o'zgacha ifor beradi.",
        }
      ]
    },
    instagram: {
      tagline: "Biz ijtimoiy tarmoqlarda",
      title: "Instagram sahifamizdan lavhalar",
    },
    faq: {
      tagline: "Yordam",
      title: "Ko'p beriladigan savollar",
      subtitle: "Agar savollaringiz bo'lsa, istalgan vaqtda biz bilan bog'lanishingiz mumkin.",
      items: [
        {
          q: "Yetkazib berish qancha vaqt oladi?",
          a: "Toshkent shahrida buyurtmalar 24 soat ichida yetkaziladi. Viloyat markazlariga 1-3 ish kunida yetkazib beramiz."
        },
        {
          q: "Mahsulotlar xavfsizmi?",
          a: "Ha, barcha mahsulotlarimiz sertifikatlangan, sifat nazoratidan o'tgan va uy sharoitida foydalanish uchun mutlaqo xavfsiz."
        },
        {
          q: "Ulgurji (optom) savdo bormi?",
          a: "Ha, bizda ulgurji va chakana savdo yo'lga qo'yilgan. Batafsil ma'lumot uchun CALL CENTER raqamimizga bog'lanishingiz mumkin."
        },
        {
          q: "Showroom qayerda joylashgan?",
          a: "Bizning showroomimiz Toshkent sh., Yunusobod tumani, Bog'ishamol ko'chasida joylashgan. Xaritani footer qismida ko'rishingiz mumkin."
        }
      ]
    },
    about: {
      tagline: "Kompaniya haqida",
      title: "Uuma Group — Premium sifat standarti",
      storyTitle: "Bizning tariximiz",
      storyText: "Uuma Group maishiy kimyo bozorida yangi standartlarni o'rnatish maqsadida tashkil etilgan. Bizning Habfer va Jieti brendlarimiz - bu yillar davomida to'plangan tajriba va eng zamonaviy texnologiyalar mahsulidir. Biz kiyim-kechaklaringiz toza, uyingiz esa xushbo'y iforga to'la bo'lishi uchun har bir komponentni sinchkovlik bilan tanlaymiz.",
      values: [
        {
          title: "Sifat nazorati",
          text: "Har bir mahsulot laboratoriya sinovlaridan o'tadi va xalqaro standartlarga to'liq javob beradi."
        },
        {
          title: "Mahalliy ishlab chiqarish",
          text: "O'zbekistonda ishlab chiqarilgan mahsulotlarimiz orqali biz milliy iqtisodiyotga hissa qo'xamiz."
        },
        {
          title: "Ekologik tozalik",
          text: "Mahsulotlarimiz tabiatga va insonga zarar yetkazmaydigan xavfsiz komponentlardan tashkil topgan."
        }
      ]
    },
    checkout: {
      title: "Buyurtma berish",
      name: "Ismingiz",
      namePlaceholder: "Ismingizni kiriting",
      phone: "Telefon raqamingiz",
      phonePlaceholder: "+998 XX XXX XX XX",
      address: "Manzilingiz",
      addressPlaceholder: "Yetkazib berish manzilini kiriting",
      submit: "Telegram orqali buyurtma",
      success: "Buyurtma qabul qilindi!",
      error: "Iltimos, barcha maydonlarni to'ldiring!",
      confirmNote: "Buyurtma Telegram orqali tasdiqlanadi",
      telegram: {
        header: "🛒 *Yangi Buyurtma*",
        name: "👤 Ism",
        phone: "📞 Telefon",
        address: "📍 Manzil",
        products: "📦 *Mahsulotlar:*",
        total: "💰 *Jami",
      }
    },
    common: {
      more: "Batafsil ma'lumot",
      viewAll: "Hammasini ko'rish",
    }
  },
  ru: {
    seo: {
      title: "Uuma Group | Премиальная бытовая химия",
      description: "Бренды Habfer и Jieti - для создания идеальной чистоты и аромата в вашем доме. Премиум качество, специально для женщин.",
    },
    nav: {
      home: "Главная",
      catalog: "Каталог",
      about: "О компании",
      cart: "Корзина",
      faq: "Вопросы",
    },
    hero: {
      tagline: "Чистящие средства премиум-класса",
      title: "Uuma Group",
      subtitle: "Товары для женщин и дома",
      desc: "Создайте идеальную чистоту и аромат в своем доме с брендами Habfer и Jieti. Бытовая химия премиального качества.",
      cta: "Смотреть каталог",
      stats: {
        products: "Текстиль",
        customers: "Клиенты",
        quality: "Качество",
      }
    },
    trust: {
      tagline: "Почему Uuma Group?",
      title: "Ваше доверие важно для нас",
      delivery: "Быстрая доставка",
      deliveryDesc: "Доставка по Ташкенту в течение 24 часов",
      guarantee: "Гарантия качества",
      guaranteeDesc: "100% оригинальная и сертифицированная продукция",
      support: "Поддержка 24/7",
      supportDesc: "Связь через Telegram в любое время",
      premium: "Премиум уровень",
      premiumDesc: "Habfer и Jieti: бытовая химия премиум-класса",
    },
    categories: {
      tagline: "Категории",
      title: "Виды продукции",
      liquid: "Жидкие продукты",
      liquidDesc: "Гели, мыло и моющие средства",
      capsules: "Капсулы и гранулы",
      capsulesDesc: "Ароматизаторы и капсулы для стирки",
      household: "Хозяйственные товары",
      householdDesc: "Корзины и бытовые принадлежности",
    },
    featured: {
      tagline: "Лучшее",
      title: "Популярные товары",
      viewAll: "Посмотреть все",
    },
    catalog: {
      showroom: "Шоурум",
      title: "Каталог товаров",
      all: "Все",
      searchPlaceholder: "Поиск товаров...",
      empty: "Товары не найдены.",
      brands: "Бренды",
      resultsLabel: "товаров найдено",
      categoryLabel: "Категории",
      sort: {
        label: "Сортировка",
        newest: "Сначала новые",
        priceLow: "Сначала дешевые",
        priceHigh: "Сначала дорогие",
      }
    },
    cart: {
      title: "Ваша корзина",
      empty: "Ваша корзина пока пуста.",
      toCatalog: "Продолжить покупки",
      summary: "Итог заказа",
      total: "Итого",
      viewCart: "Посмотреть корзину",
      checkout: "Оформить заказ",
      remove: "Удалить",
      items: "товаров",
      currency: "сум",
    },
    footer: {
      desc: "Производитель бытовой химии премиум-класса. Мы предлагаем высококачественную продукцию Habfer и Jieti для создания идеальной чистоты и аромата в вашем доме.",
      pages: "Страницы",
      categories: "Категории",
      contact: "Контакты",
      address: "г. Ташкент, Мирабадский р-н",
      workHours: "График работы: 09:00 - 18:00 (Пн - Сб)",
      allRights: "Все права защищены.",
    },
    product: {
      addToCart: "В корзину",
      added: "Добавлено в корзину",
      badges: {
        premium: "Премиум",
        bestSeller: "Хит продаж",
        new: "Новинка",
        scented: "Самый ароматный",
      },
      names: {
        belizna: "Белизна: Отбеливатель",
        soap: "Жидкое мыло: Морское",
        basket: "Корзина для хранения Premium",
      },
      related: "Похожие товары",
      usage: "Способ применения",
      categoryLabel: "Категория",
      recent: "Вы недавно смотрели",
    },
    testimonials: {
      tagline: "Отзывы клиентов",
      title: "Что о нас говорят?",
      items: [
        {
          name: "Малика Акромова",
          role: "Домохозяйка",
          text: "Попробовала гели Habfer, аромат просто супер! Одежда очень мягкая и чистая. Теперь буду брать только их.",
        },
        {
          name: "Ситора Исмоилова",
          role: "Блогер",
          text: "Продукция Jieti стала настоящим открытием. Особенно поразил эффект чистящих средств для кухни. Рекомендую!",
        },
        {
          name: "Дилдора Рахимова",
          role: "Бизнес-леди",
          text: "Премиальное качество и красивый дизайн. Продукты Uuma Group не только хорошо чистят, но и дарят дому особый аромат.",
        }
      ]
    },
    instagram: {
      tagline: "Мы в социальных сетях",
      title: "Кадры из нашего Instagram",
    },
    faq: {
      tagline: "Помощь",
      title: "Часто задаваемые вопросы",
      subtitle: "Если у вас есть вопросы, вы можете связаться с нами в любое время.",
      items: [
        {
          q: "Сколько времени занимает доставка?",
          a: "В Ташкенте доставка заказа занимает до 24 часов. В областные центры доставка осуществляется в течение 1-3 рабочих дней."
        },
        {
          q: "Безопасны ли продукты?",
          a: "Да, вся наша продукция сертифицирована, прошла контроль качества и абсолютно безопасна для использования в домашних условиях."
        },
        {
          q: "Есть ли оптовые продажи?",
          a: "Да, у нас налажена как оптовая, так и розничная торговля. Для подробной информации свяжитесь с нашим CALL-центром."
        },
        {
          q: "Где находится шоурум?",
          a: "Наш шоурум находится в Ташкенте, Юнусабадский район, улица Богишамол. Вы можете увидеть карту в футере."
        }
      ]
    },
    about: {
      tagline: "О компании",
      title: "Uuma Group — Стандарт премиум качества",
      storyTitle: "Наша история",
      storyText: "Uuma Group была основана с целью установить новые стандарты на рынке бытовой химии. Наши бренды Habfer и Jieti — это результат многолетнего опыта и самых современных технологий. Мы тщательно подбираем каждый компонент, чтобы ваша одежда была чистой, а ваш дом наполнен приятным ароматом.",
      values: [
        {
          title: "Контроль качества",
          text: "Каждый продукт проходит лабораторные испытания и полностью соответствует международным стандартам."
        },
        {
          title: "Местное производство",
          text: "Через наши продукты, произведенные в Узбекистане, мы вносим вклад в национальную экономику."
        },
        {
          title: "Экологичность",
          text: "Наши продукты состоят из безопасных компонентов, не наносящих вреда природе и человеку."
        }
      ]
    },
    checkout: {
      title: "Оформление заказа",
      name: "Ваше имя",
      namePlaceholder: "Введите ваше имя",
      phone: "Номер телефона",
      phonePlaceholder: "+998 XX XXX XX XX",
      address: "Адрес доставки",
      addressPlaceholder: "Введите адрес доставки",
      submit: "Заказать через Telegram",
      success: "Заказ принят!",
      error: "Пожалуйста, заполните все поля!",
      confirmNote: "Заказ будет подтвержден через Telegram",
      telegram: {
        header: "🛒 *Новый Заказ*",
        name: "👤 Имя",
        phone: "📞 Телефон",
        address: "📍 Адрес",
        products: "📦 *Товары:*",
        total: "💰 *Итого",
      }
    },
    common: {
      more: "Подробнее",
      viewAll: "Смотреть все",
    }
  },
  en: {
    seo: {
      title: "Uuma Group | Premium Household Chemicals",
      description: "Habfer and Jieti brands for creating perfect cleanliness and fragrance in your home. Premium quality, specifically designed for women.",
    },
    nav: {
      home: "Home",
      catalog: "Catalog",
      about: "About Us",
      cart: "Cart",
      faq: "FAQ",
    },
    hero: {
      tagline: "Premium Cleaning Solutions",
      title: "Uuma Group",
      subtitle: "Products for women and home",
      desc: "Create perfect cleanliness and fragrance in your home with Habfer and Jieti brands. Premium quality household chemicals.",
      cta: "View Catalog",
      stats: {
        products: "Products",
        customers: "Customers",
        quality: "Quality",
      }
    },
    trust: {
      tagline: "Why Uuma Group?",
      title: "Your Trust Matters to Us",
      delivery: "Fast Delivery",
      deliveryDesc: "Delivered within 24 hours in Tashkent",
      guarantee: "Quality Guarantee",
      guaranteeDesc: "100% original and certified products",
      support: "24/7 Support",
      supportDesc: "Contact via Telegram at any time",
      premium: "Premium Level",
      premiumDesc: "Habfer & Jieti: Premium Household Chemicals",
    },
    categories: {
      tagline: "Categories",
      title: "Product Types",
      liquid: "Liquid Products",
      liquidDesc: "Gels, soaps, and detergents",
      capsules: "Capsules & Granules",
      capsulesDesc: "Fragrances and laundry capsules",
      household: "Household Goods",
      householdDesc: "Baskets and household appliances",
    },
    featured: {
      tagline: "The Best",
      title: "Popular Products",
      viewAll: "View All",
    },
    catalog: {
      showroom: "Showroom",
      title: "Product Catalog",
      all: "All",
      searchPlaceholder: "Search products...",
      empty: "No products found.",
      brands: "Brands",
      resultsLabel: "products found",
      categoryLabel: "Categories",
      sort: {
        label: "Sort By",
        newest: "Newest First",
        priceLow: "Price: Low to High",
        priceHigh: "Price: High to Low",
      }
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is currently empty.",
      toCatalog: "Continue Shopping",
      summary: "Order Summary",
      total: "Total",
      viewCart: "View Cart",
      checkout: "Checkout",
      remove: "Remove",
      items: "items",
      currency: "UZS",
    },
    footer: {
      desc: "Premium household chemicals manufacturer. We offer high-quality Habfer and Jieti products to create perfect cleanliness and fragrance in your home.",
      pages: "Pages",
      categories: "Categories",
      contact: "Contact",
      address: "Mirabad dist., Tashkent city",
      workHours: "Working hours: 09:00 - 18:00 (Mon - Sat)",
      allRights: "All rights reserved.",
    },
    product: {
      addToCart: "To Cart",
      added: "Added to cart",
      badges: {
        premium: "Premium",
        bestSeller: "Best Seller",
        new: "New",
        scented: "Most Fragrant",
      },
      names: {
        belizna: "Bleach: Universal",
        soap: "Liquid Soap: Sea",
        basket: "Premium Storage Basket",
      },
      related: "Related Products",
      usage: "How to Use",
      categoryLabel: "Category",
      recent: "Recently Viewed",
    },
    testimonials: {
      tagline: "Happy Customers",
      title: "What people say about us",
      items: [
        {
          name: "Malika Akromova",
          role: "Homemaker",
          text: "I tried Habfer gels, the scent is amazing! Clothes come out very soft and clean. I will only buy these from now on.",
        },
        {
          name: "Sitora Ismoilova",
          role: "Blogger",
          text: "Jieti products were a real find. I was especially impressed with the effect of kitchen cleaning products. Highly recommend!",
        },
        {
          name: "Dildora Rahimova",
          role: "Business Woman",
          text: "Premium quality and beautiful design. Uuma Group products not only clean well but also add a special fragrance to the home.",
        }
      ]
    },
    instagram: {
      tagline: "We are on social networks",
      title: "Scenes from our Instagram",
    },
    faq: {
      tagline: "Support",
      title: "Frequently Asked Questions",
      subtitle: "If you have any questions, you can contact us at any time.",
      items: [
        {
          q: "How long does delivery take?",
          a: "Delivery in Tashkent takes within 24 hours. For regional centers, we deliver within 1-3 business days."
        },
        {
          q: "Are the products safe?",
          a: "Yes, all our products are certified, quality-controlled, and completely safe for home use."
        },
        {
          q: "Do you offer wholesale?",
          a: "Yes, we handle both wholesale and retail trade. For more details, please contact our CALL CENTER."
        },
        {
          q: "Where is the showroom located?",
          a: "Our showroom is located in Tashkent, Yunusobod district, Bogishamol street. You can see the location in the footer."
        }
      ]
    },
    about: {
      tagline: "About Us",
      title: "Uuma Group — Premium Quality Standard",
      storyTitle: "Our Story",
      storyText: "Uuma Group was founded with the goal of setting new standards in the household chemical market. Our Habfer and Jieti brands are the result of years of experience and state-of-the-art technologies. We carefully select every component so that your clothes are clean and your home is filled with pleasant fragrance.",
      values: [
        {
          title: "Quality Control",
          text: "Every product undergoes laboratory testing and fully complies with international standards."
        },
        {
          title: "Local Production",
          text: "Through our products manufactured in Uzbekistan, we contribute to the national economy."
        },
        {
          title: "Eco-Friendly",
          text: "Our products consist of safe components that do not harm nature or humans."
        }
      ]
    },
    checkout: {
      title: "Checkout",
      name: "Your Name",
      namePlaceholder: "Enter your name",
      phone: "Phone Number",
      phonePlaceholder: "+998 XX XXX XX XX",
      address: "Delivery Address",
      addressPlaceholder: "Enter delivery address",
      submit: "Order via Telegram",
      success: "Order Accepted!",
      error: "Please fill in all fields!",
      confirmNote: "Order will be confirmed via Telegram",
      telegram: {
        header: "🛒 *New Order*",
        name: "👤 Name",
        phone: "📞 Phone",
        address: "📍 Address",
        products: "📦 *Products:*",
        total: "💰 *Total",
      }
    },
    common: {
      more: "Learn More",
      viewAll: "View All",
    }
  }
};
