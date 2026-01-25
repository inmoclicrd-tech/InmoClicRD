const users = [
  {
    id: 1,
    name: "Juan Perez",
    verified: true
  },
  {
    id: 2,
    name: "Maria Lopez",
    verified: false
  }
];



const properties = [
{
    id: 2,
    title: "🏠 ¡Apartamento en alquiler en Residencial San Isidro Labrador 📍 Ubicación: tercer nivel",
    type: "Apartamento",
    operation:"Alquiler",
    description: "🏠 ¡Apartamento en alquiler en Residencial San Isidro Labrador",
    rooms: "3",
    baths: "1",
    parking: "1",
    price: "RD$17,000",
    city: "Santo Domingo Este",
    image: "https://scontent.fhex4-1.fna.fbcdn.net/v/t39.84726-6/615816398_1585169562807287_989542542515961569_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=100&ccb=1-7&_nc_sid=92e707&_nc_ohc=86dZ6xX8PUoQ7kNvwE0Glm7&_nc_oc=Adn5jM_mYkX9v1mJsYUYOrAszc51bN4Ope1dmS8OGMAP4EoymzpZKeFtSWtEhsKASn2eOTrVviDrcVRJ0CEkYkF0&_nc_zt=14&_nc_ht=scontent.fhex4-1.fna&_nc_gid=0EN7BNhBEpDpOQMa7OsOcg&oh=00_Afp6ZWdqY-tg27Y3P4GlSiQx7L14Fa_JpV98nwyubfqAcQ&oe=6978C18D",
    images: ["https://scontent.fhex4-1.fna.fbcdn.net/v/t39.84726-6/615816398_1585169562807287_989542542515961569_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=100&ccb=1-7&_nc_sid=92e707&_nc_ohc=86dZ6xX8PUoQ7kNvwE0Glm7&_nc_oc=Adn5jM_mYkX9v1mJsYUYOrAszc51bN4Ope1dmS8OGMAP4EoymzpZKeFtSWtEhsKASn2eOTrVviDrcVRJ0CEkYkF0&_nc_zt=14&_nc_ht=scontent.fhex4-1.fna&_nc_gid=0EN7BNhBEpDpOQMa7OsOcg&oh=00_Afp6ZWdqY-tg27Y3P4GlSiQx7L14Fa_JpV98nwyubfqAcQ&oe=6978C18D",
    "https://scontent.fhex4-2.fna.fbcdn.net/v/t45.5328-4/619657328_4214248512222503_4686650946587382142_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=111&ccb=1-7&_nc_sid=247b10&_nc_ohc=LLZvmsusEjgQ7kNvwHMNNTB&_nc_oc=AdmneBHrr9hkao0JaBFO5sIRpXoeqBC73knNB4GFcrS-ZI0CuW5PzsJ1x3dU1khqto8APYKrqEFOscXbRe-JPKhk&_nc_zt=23&_nc_ht=scontent.fhex4-2.fna&_nc_gid=0EN7BNhBEpDpOQMa7OsOcg&oh=00_AfrEUuMec55hbW2FzeR7UHWp8prJNML-cYoGHQHAXq7nDQ&oe=6978E9F5",
    "https://scontent.fhex4-2.fna.fbcdn.net/v/t45.5328-4/618686997_2053920558728188_5196332321489862308_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=108&ccb=1-7&_nc_sid=247b10&_nc_ohc=mquDu4kU4v0Q7kNvwHoNNE_&_nc_oc=AdmHw8aPFeKKC59YyMy8VOPf_5dNGWbZNbIEwCRR_ZoLTDKbdxQOuGxzNYgxEbid92HoEuoq57mr_3nH9_XB--sK&_nc_zt=23&_nc_ht=scontent.fhex4-2.fna&_nc_gid=0EN7BNhBEpDpOQMa7OsOcg&oh=00_AfrF61b_lxffIauiWioi1kXeQz7lv3UEvg0eBsc41r2o3A&oe=6978EF9E",
    "https://scontent.fhex4-1.fna.fbcdn.net/v/t45.5328-4/618636807_870108945661373_7932116482285621284_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=106&ccb=1-7&_nc_sid=247b10&_nc_ohc=PsFL3e_lEWgQ7kNvwFwxnN6&_nc_oc=Adl7K7QLtviKf8XDzk4AY2tFimWSCfiBSyuZrTYT09_ydT6N5sKAW1rcjoqVghUUNuQU2LpMk2hpspeaISPyZgBn&_nc_zt=23&_nc_ht=scontent.fhex4-1.fna&_nc_gid=0EN7BNhBEpDpOQMa7OsOcg&oh=00_AfpmViSyS6jzmc5KvnU0mr_msS6xLTeFkjRo_yBdnK8btw&oe=6978C947",
    "https://scontent.fhex4-1.fna.fbcdn.net/v/t45.5328-4/620632088_1255839856600499_1810752575500959291_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=98oECFTX7-0Q7kNvwEZQLFE&_nc_oc=AdkEHLjE0chu8exE_nZjRM0LZxToCLtXj8VMRE5lVdMkdEXHwLdLRuyX7RKLzhHn5vNUxtltRrPHZgDvO9CbGqnv&_nc_zt=23&_nc_ht=scontent.fhex4-1.fna&_nc_gid=0EN7BNhBEpDpOQMa7OsOcg&oh=00_Afp0Z70hRumBXI_FbBv-LaQOsYbEPVwinObHaOVvQslGcg&oe=6978F601"],
    whatsapp: "18091234567",
    verified: true,
    userID: 1
  },
  {
    id: 1,
    title: "Apartamento en alquiler en Alma Rosa II",
    type: "Apartamento",
    operation:"Alquiler",
    description: " Apartamento en alquiler con excelente ubicación, cerca de Mega Centro y a pocos minutos de supermercados, plazas comerciales y servicios esenciales.",
    rooms: "4",
    baths: "2",
    parking: "2",
    price: "RD$35,000",
    city: "Santo Domingo Este",
    image: "https://scontent.fhex4-2.fna.fbcdn.net/v/t39.84726-6/616773528_1215953189952872_3870764541737496755_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=107&ccb=1-7&_nc_sid=92e707&_nc_ohc=1SX09BkjyckQ7kNvwHCmz9V&_nc_oc=AdkmNDOmEXnzXiA0iE42gTiFTvIIAqaxBMm6WEl3XyFqnZrAwAAivM0sVEPX7CaZoUpT5h6S26iF0tb2UEiO0uS-&_nc_zt=14&_nc_ht=scontent.fhex4-2.fna&_nc_gid=X0bVW7O4Ede8neo9kDWc5w&oh=00_AfpPQ7NVhkHLBNxqrQh3Y_j_EpsAnr7y5EQp2ESlGTT7jQ&oe=6978F44A",
    images: ["https://scontent.fhex4-2.fna.fbcdn.net/v/t39.84726-6/616773528_1215953189952872_3870764541737496755_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=107&ccb=1-7&_nc_sid=92e707&_nc_ohc=1SX09BkjyckQ7kNvwHCmz9V&_nc_oc=AdkmNDOmEXnzXiA0iE42gTiFTvIIAqaxBMm6WEl3XyFqnZrAwAAivM0sVEPX7CaZoUpT5h6S26iF0tb2UEiO0uS-&_nc_zt=14&_nc_ht=scontent.fhex4-2.fna&_nc_gid=X0bVW7O4Ede8neo9kDWc5w&oh=00_AfpPQ7NVhkHLBNxqrQh3Y_j_EpsAnr7y5EQp2ESlGTT7jQ&oe=6978F44A","https://scontent.fhex4-2.fna.fbcdn.net/v/t45.5328-4/619214178_2304522636694959_6745971402793693391_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=247b10&_nc_ohc=M91R2GF-xcIQ7kNvwGMMEWX&_nc_oc=AdmfCjTgfskIJPWutyb_JhzRfaxFtnK1frLzQFD22tDRZmtIioiFTIuV_JlHJjyMtmcyQa-fkihcjJnIBFs7kYEy&_nc_zt=23&_nc_ht=scontent.fhex4-2.fna&_nc_gid=X0bVW7O4Ede8neo9kDWc5w&oh=00_AfogDs6cQg_eAVyP-HAcfJTFH62Ri-0XNf0bhyjM1Q7eYw&oe=6978D09E","https://scontent.fhex4-2.fna.fbcdn.net/v/t45.5328-4/617437097_1594708111733848_6867735226523234844_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=247b10&_nc_ohc=QIia63157f0Q7kNvwElcaym&_nc_oc=AdlKY75av8Vufcp9NUDKD40rb2WUf7FfmLQ2tp2eaJ1oBEvzYMDSeHF9y4ODRoiNWtcC1tmP-FltER6LmaocwWIB&_nc_zt=23&_nc_ht=scontent.fhex4-2.fna&_nc_gid=X0bVW7O4Ede8neo9kDWc5w&oh=00_AfoaYtZPHdoTfGfjDrG3toyfJw8h5r0nMcT2uVJlDREFcw&oe=6978C62E"],
    whatsapp: "18492742519",
    verified: true,
    userID: 2
  },
  {
    id: 5,
    title: "Apartamento moderno en alquiler",
    type: "Apartamento",
    operation:"Alquiler",
    description: "Apartamento moderno en alquiler.",
    rooms: "3",
    baths: "1",
    parking: "1",
    price: "RD$25,000",
    city: "Santo Domingo Norte",
    image: "https://scontent.fhex4-1.fna.fbcdn.net/v/t39.84726-6/618153041_25597097173293455_3033893642990890335_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=100&ccb=1-7&_nc_sid=92e707&_nc_ohc=gq150-U1SSYQ7kNvwEE1kax&_nc_oc=AdmIcrgQ-jVZmXSIY_v3CER98rAw3cJwEKvV5A1Barsb8bR8Kl9lI6cO7ix9mP79yizZGSgXl4Ov5e3eQ0A1pUmw&_nc_zt=14&_nc_ht=scontent.fhex4-1.fna&_nc_gid=kqv_nxdSoj19KH54mdoGug&oh=00_AfrCOy37IXK9KcI4M5haME1U7Ye5yzCnr4JqOTWFwUzgXw&oe=6978F5BB",
    images: ["https://scontent.fhex4-1.fna.fbcdn.net/v/t39.84726-6/618153041_25597097173293455_3033893642990890335_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=100&ccb=1-7&_nc_sid=92e707&_nc_ohc=gq150-U1SSYQ7kNvwEE1kax&_nc_oc=AdmIcrgQ-jVZmXSIY_v3CER98rAw3cJwEKvV5A1Barsb8bR8Kl9lI6cO7ix9mP79yizZGSgXl4Ov5e3eQ0A1pUmw&_nc_zt=14&_nc_ht=scontent.fhex4-1.fna&_nc_gid=kqv_nxdSoj19KH54mdoGug&oh=00_AfrCOy37IXK9KcI4M5haME1U7Ye5yzCnr4JqOTWFwUzgXw&oe=6978F5BB"],
    whatsapp: "18091234567",
    verified: true,
    userID: 1
  },
  {
    id: 4,
    title: "Casa amplia en venta",
    type: "Casa",
    operation:"Venta",
    description: "Casa moderna",
    rooms: "4",
    baths: "2",
    parking: "1",
    price: "RD$4,500,000",
    city: "Santiago",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    whatsapp: "18097654321",
    verified: true,
    userID: 1
  },
  {
    id: 3,
    title: "Apartamento en alquiler en el centro",
    type: "Apartamento",
    operation:"Alquiler",
    description: "Apartamento moderno, céntrico y bien ventilado.",
    rooms: "2",
    baths: "2",
    parking: "1",
    price: "RD$22,500",
    city: "Santo Domingo",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    whatsapp: "18097654321",
    verified: false,
    userID: 2
  }
];
