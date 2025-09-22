const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const heroes = [
        {
            "nickname": "ShadowStrike",
            "realName": "Ethan Black",
            "originDescription": "Once a covert operative, he gained the power to manipulate shadows after a mysterious experiment.",
            "superpowers": ["Shadow manipulation", "Invisibility", "Teleportation"],
            "catchPhrase": "You can't fight what you can't see!",
            "images": [
                {"url": "https://example.com/shadowstrike1.jpg"},
                {"url": "https://example.com/shadowstrike2.jpg"}
            ]
        },
        {
            "nickname": "SolarFlare",
            "realName": "Luna Sparks",
            "originDescription": "Born during a solar storm, she absorbs solar energy to unleash devastating fire blasts.",
            "superpowers": ["Solar energy absorption", "Fire blasts", "Flight"],
            "catchPhrase": "Feel the heat of the sun!",
            "images": [
                {"url": "https://example.com/solarflare1.jpg"}
            ]
        },
        {
            "nickname": "IronGuard",
            "realName": "Max Steele",
            "originDescription": "A brilliant engineer who built a powerful suit of armor to fight crime.",
            "superpowers": ["Powered armor", "Super strength", "Advanced weaponry"],
            "catchPhrase": "No one breaks the guard!",
            "images": [
                {"url": "https://example.com/ironguard1.jpg"}
            ]
        },
        {
            "nickname": "AquaBlade",
            "realName": "Marina Tide",
            "originDescription": "Raised by a secret aquatic tribe, she wields the power of water and blades.",
            "superpowers": ["Water manipulation", "Swordsmanship", "Enhanced agility"],
            "catchPhrase": "The tide always wins.",
            "images": [
                {"url": "https://example.com/aquablade1.jpg"}
            ]
        },
        {
            "nickname": "ThunderClaw",
            "realName": "Jake Storm",
            "originDescription": "Struck by lightning and gifted with electrifying claws.",
            "superpowers": ["Electric manipulation", "Claws", "Super speed"],
            "catchPhrase": "Feel the thunder strike!",
            "images": [
                {"url": "https://example.com/thunderclaw1.jpg"}
            ]
        },
        {
            "nickname": "NightWolf",
            "realName": "Lara Moon",
            "originDescription": "Bitten by a mystical wolf, she gained enhanced senses and strength.",
            "superpowers": ["Enhanced senses", "Super strength", "Regeneration"],
            "catchPhrase": "I hunt in the shadows.",
            "images": [
                {"url": "https://example.com/nightwolf1.jpg"}
            ]
        },
        {
            "nickname": "CrystalMage",
            "realName": "Selena Frost",
            "originDescription": "A sorceress who commands crystals and ice magic.",
            "superpowers": ["Cryomancy", "Crystal creation", "Teleportation"],
            "catchPhrase": "Freeze your fears.",
            "images": [
                {"url": "https://example.com/crystalmage1.jpg"}
            ]
        },
        {
            "nickname": "WindRider",
            "realName": "Derek Gale",
            "originDescription": "Born with the ability to control winds and fly at incredible speeds.",
            "superpowers": ["Wind manipulation", "Flight", "Super speed"],
            "catchPhrase": "Catch the wind!",
            "images": [
                {"url": "https://example.com/windrider1.jpg"}
            ]
        },
        {
            "nickname": "IronFang",
            "realName": "Victor Fang",
            "originDescription": "A warrior with metallic claws and unmatched combat skills.",
            "superpowers": ["Metal claws", "Hand-to-hand combat", "Enhanced durability"],
            "catchPhrase": "Bite hard, fight harder.",
            "images": [
                {"url": "https://example.com/ironfang1.jpg"}
            ]
        },
        {
            "nickname": "PhoenixFlame",
            "realName": "Isabel Blaze",
            "originDescription": "Reborn from ashes, she controls fire and heals rapidly.",
            "superpowers": ["Fire manipulation", "Regeneration", "Flight"],
            "catchPhrase": "From ashes, I rise!",
            "images": [
                {"url": "https://example.com/phoenixflame1.jpg"}
            ]
        },
        {
            "nickname": "SteelSentinel",
            "realName": "Marcus Steel",
            "originDescription": "A guardian powered by a mechanical exoskeleton and advanced AI.",
            "superpowers": ["Powered armor", "AI enhanced reflexes", "Super strength"],
            "catchPhrase": "Your protector in steel.",
            "images": [
                {"url": "https://example.com/steelsentinel1.jpg"}
            ]
        },
        {
            "nickname": "MysticShade",
            "realName": "Olivia Dark",
            "originDescription": "A mage who uses shadows and illusions to confuse enemies.",
            "superpowers": ["Shadow manipulation", "Illusions", "Invisibility"],
            "catchPhrase": "The darkness hides all truths.",
            "images": [
                {"url": "https://example.com/mysticshade1.jpg"}
            ]
        },
        {
            "nickname": "Blizzard",
            "realName": "Evan Frost",
            "originDescription": "Controls ice storms and freezing winds to subdue foes.",
            "superpowers": ["Ice manipulation", "Weather control", "Enhanced endurance"],
            "catchPhrase": "Freeze the world!",
            "images": [
                {"url": "https://example.com/blizzard1.jpg"}
            ]
        },
        {
            "nickname": "Volt",
            "realName": "Zara Sparks",
            "originDescription": "Harnesses raw electricity to shock and stun enemies.",
            "superpowers": ["Electricity generation", "Lightning speed", "Energy blasts"],
            "catchPhrase": "Voltage overload!",
            "images": [
                {"url": "https://example.com/volt1.jpg"}
            ]
        },
        {
            "nickname": "IronWill",
            "realName": "Tom Steel",
            "originDescription": "Unbreakable willpower and body fortified with nanotech.",
            "superpowers": ["Invulnerability", "Nanotech enhancement", "Super strength"],
            "catchPhrase": "Nothing can bend me.",
            "images": [
                {"url": "https://example.com/ironwill1.jpg"}
            ]
        }
    ];

async function main() {
    for (const hero of heroes) {
        await prisma.superhero.create({
            data: {
                nickname: hero.nickname,
                realName: hero.realName,
                originDescription: hero.originDescription,
                superpowers: hero.superpowers,
                catchPhrase: hero.catchPhrase,
                images: {
                    create: hero.images,
                },
            },
        });
    }
    console.log('Seeding finished.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
