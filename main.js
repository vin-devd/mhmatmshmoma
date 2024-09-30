const mongoose = require('mongoose');
const fileSchema = require('./schema/azanSchema');
const moment = require('moment-timezone');
const { PrayerTimes, CalculationMethod } = require('adhan');

mongoose.connect('mongodb+srv://dfhh:YeqlAeFzhChutTbL@id.wy06g.mongodb.net/', {}).then(() => {
    console.log('تم الاتصال بقاعدة البيانات بنجاح!');
});


bot.on('interactionCreate', async (int) => {
    if (int.isButton()) {
        const DataSchema = require('./schema/azanSchema');

        if (int.customId.startsWith('updateButton_')) {
            const channelId = int.customId.split('_')[1];
            const country = int.customId.split('_')[2];
            const lona = int.customId.split('_')[3]
            const lata = int.customId.split('_')[4]
            const channel = bot.channels.cache.get(channelId);
            const data = await DataSchema.findOne({ guildId: int.guildId });

            const ButtonUpdate = new ButtonBuilder()
                .setCustomId(`updateButton`)
                .setLabel('تحديث المعلومات')
                .setDisabled(true)
                .setStyle(ButtonStyle.Primary);

            const ButtonDelete = new ButtonBuilder()
                .setCustomId('deleteButton')
                .setLabel('حذف المعلومات')
                .setDisabled(true)
                .setStyle(ButtonStyle.Danger);

            const actionRow = new ActionRowBuilder()
                .addComponents(ButtonDelete, ButtonUpdate);

            if (data) {
                await int.update({ components: [actionRow], content: '✅ تم تحديث المعلومات بنجاح!' });
                await DataSchema.findOneAndUpdate({ channelId: channelId, country: country, lat: `${lata}`, lon: `${lona}` });
            }
        } else if (int.customId === 'deleteButton') {
            const data = await DataSchema.findOne({ guildId: int.guildId });

            const ButtonUpdate = new ButtonBuilder()
                .setCustomId(`updateButton`)
                .setLabel('تحديث المعلومات')
                .setDisabled(true)
                .setStyle(ButtonStyle.Primary);

            const ButtonDelete = new ButtonBuilder()
                .setCustomId('deleteButton')
                .setLabel('حذف المعلومات')
                .setDisabled(true)
                .setStyle(ButtonStyle.Danger);

            const actionRow = new ActionRowBuilder()
                .addComponents(ButtonDelete, ButtonUpdate);

            if (data) {
                await int.update({ components: [actionRow], content: '✅ تم حذف المعلومات بنجاح!' });
                await DataSchema.deleteOne({ guildId: int.guildId, channelId: data.channelId, country: data.country });
            }
        }
        if(int.customId === 'snn'){
            
const adhanEmbed = new EmbedBuilder()
.setTitle('سنن الأذان للمصلي في الإسلام')
.setDescription(`
1. **الإجابة بعد الأذان**: يستحب ترديد ما يقول المؤذن إلا في "حي على الصلاة" و"حي على الفلاح"، فيقول "لا حول ولا قوة إلا بالله".

2. **الدعاء بين الأذان والإقامة**: يستحب للمسلم الدعاء بين الأذان والإقامة، لأنه وقت إجابة الدعاء.

3. **الصلاة على النبي ﷺ**: بعد انتهاء الأذان، يُستحب قول: "اللهم صل على محمد وعلى آل محمد كما صليت على إبراهيم..." إلى نهاية الصلاة الإبراهيمية.

4. **الدعاء بعد الأذان**: بعد الصلاة على النبي، يُستحب قول الدعاء: "اللهم رب هذه الدعوة التامة والصلاة القائمة آتِ محمدًا الوسيلة والفضيلة وابعثه مقامًا محمودًا الذي وعدته".

5. **الوضوء قبل الصلاة**: يُستحب أن يكون المسلم على وضوء قبل إقامة الصلاة.

6. **الذهاب إلى المسجد بهدوء**: يُستحب الذهاب إلى المسجد بهدوء ووقار عند سماع الأذان.`)
.setColor(Colors.DarkerGrey)
.setFooter({text: 'الأذان تذكرة لوقت الصلاة وأوقات الإجابة.', iconURL: int.guild.iconURL()})
.setTimestamp(); 

  int.reply({embeds: [adhanEmbed], ephemeral:true})
        }
        if(int.customId === 'ad3ea'){
          
const duaEmbed = new EmbedBuilder()
.setTitle('أدعية بين الأذان والإقامة')
.setDescription(`يُستحب للمسلم الدعاء بين الأذان والإقامة، وهذا وقتٌ تُستجاب فيه الدعوات. إليك بعض الأدعية التي يمكنك قولها:

1. **اللهم إني أسألك العفو والعافية في الدنيا والآخرة**.

2. **اللهم اغفر لي ولوالدي، وللمؤمنين والمؤمنات، الأحياء منهم والأموات**.

3. **اللهم إني أسألك من فضلك ورحمتك، فإنه لا يملكها إلا أنت**.

4. **اللهم آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار**.

5. **اللهم إني أسألك الجنة وما قرب إليها من قولٍ أو عمل، وأعوذ بك من النار وما قرب إليها من قولٍ أو عمل**.

6. **اللهم ارحمني واهدني واجبرني وعافني وارزقني**.

7. **اللهم ارزقني حبك، وحب من يحبك، وحب عمل يقربني إلى حبك**.

8. **اللهم إني أسألك الهدى والتقى والعفاف والغنى**.

9. **اللهم اجعلني لك شكّارًا، لك ذَكّارًا، لك رهّابًا، لك مطواعًا، لك مخبتًا، إليك أواهًا منيبًا**.`)
.setColor(Colors.DarkerGrey)
.setFooter({text: 'الدعاء بين الأذان والإقامة مستحب ويُستجاب بإذن الله', iconURL: int.guild.iconURL()})
.setTimestamp();
int.reply({embeds: [duaEmbed], ephemeral:true})

        }
    }
});

const countries = {
    'مصر': { lat: 30.033333, lon: 31.233334, timezone: 'Africa/Cairo' },
    'السعودية': { lat: 24.7136, lon: 46.6753, timezone: 'Asia/Riyadh' },
    'الإمارات': { lat: 25.276987, lon: 55.296249, timezone: 'Asia/Dubai' },
    'الجزائر': { lat: 36.737232, lon: 3.086472, timezone: 'Africa/Algiers' },
    'الأردن': { lat: 31.963158, lon: 35.930359, timezone: 'Asia/Amman' },
    'المغرب': { lat: 31.791702, lon: -7.09262, timezone: 'Africa/Casablanca' },
    'العراق': { lat: 33.3152, lon: 44.3661, timezone: 'Asia/Baghdad' },
    'الكويت': { lat: 29.3759, lon: 47.9774, timezone: 'Asia/Kuwait' },
    'قطر': { lat: 25.276987, lon: 51.521042, timezone: 'Asia/Qatar' },
    'تونس': { lat: 36.806389, lon: 10.181667, timezone: 'Africa/Tunis' },
    'البحرين': { lat: 26.0667, lon: 50.5577, timezone: 'Asia/Bahrain' },
    'لبنان': { lat: 33.8547, lon: 35.8623, timezone: 'Asia/Beirut' },
    'السودان': { lat: 15.5007, lon: 32.5599, timezone: 'Africa/Khartoum' },
    'ليبيا': { lat: 32.8872, lon: 13.1913, timezone: 'Africa/Tripoli' },
    'فلسطين': { lat: 31.9522, lon: 35.2332, timezone: 'Asia/Gaza' },
    'سوريا': { lat: 33.5138, lon: 36.2765, timezone: 'Asia/Damascus' },
    'عمان': { lat: 23.6100, lon: 58.5400, timezone: 'Asia/Muscat' },
    'موريتانيا': { lat: 18.0735, lon: -15.9582, timezone: 'Africa/Nouakchott' },
    'الصومال': { lat: 5.1521, lon: 46.1996, timezone: 'Africa/Mogadishu' },
    'جيبوتي': { lat: 11.8251, lon: 42.5903, timezone: 'Africa/Djibouti' },
    'جزر القمر': { lat: -11.6455, lon: 43.3333, timezone: 'Indian/Comoro' },
    'اليمن': { lat: 15.5527, lon: 48.5164, timezone: 'Asia/Aden' },
    'United Kingdom': { lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
    'Germany': { lat: 52.52, lon: 13.405, timezone: 'Europe/Berlin' },
    'Pakistan': { lat: 24.8607, lon: 67.0011, timezone: 'Asia/Karachi' },
};

function calculatePrayerTimes(coordinates, timezone) {
    const date = new Date();
    const params = CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new PrayerTimes(coordinates, date, params);

    return {
        الفجر: moment(prayerTimes.fajr).tz(timezone).format('HH:mm'),
        الظهر: moment(prayerTimes.dhuhr).tz(timezone).format('HH:mm'),
        العصر: moment(prayerTimes.asr).tz(timezone).format('HH:mm'),
        المغرب: moment(prayerTimes.maghrib).tz(timezone).format('HH:mm'),
        العشاء: moment(prayerTimes.isha).tz(timezone).format('HH:mm'),
    };
}

setInterval(async () => {
    const guilds = await fileSchema.find();

    guilds.forEach(async (dataFile) => {
        const { guildId, channelId, country, lat, lon } = dataFile;
        const guild = bot.guilds.cache.get(guildId);
        const channel = bot.channels.cache.get(channelId);

        if (channel) {
            const timezone = countries[country]?.timezone;
            if (!timezone) {
                console.error(`الدولة "${country}" غير معرفة في القائمة.`);
                return;
            }

            const prayerTimes = calculatePrayerTimes({ latitude: lat, longitude: lon }, timezone);
            const currentTime = moment().tz(timezone).format('HH:mm');
            const prayerKeys = Object.keys(prayerTimes);

            for (const prayer of prayerKeys) {
                if (currentTime === prayerTimes[prayer]) {
                    const embedAzan = new EmbedBuilder()
                    .setTitle(`موعد اذان ${prayer}`)
                    .setDescription(`حان الان موعد اذان ${prayer} في دولة ${country}`)
                    .setColor(Colors.Aqua)
                    .setTimestamp()

                    const ad3ea = new ButtonBuilder()
                    .setCustomId('ad3ea')
                    .setLabel('ادعية بعد الاذان')
                    .setStyle(ButtonStyle.Secondary)
                    
                    
                    const snn = new ButtonBuilder()
                    .setCustomId('snn')
                    .setLabel('سنن الاذان')
                    .setStyle(ButtonStyle.Secondary)

                    const acta = new ActionRowBuilder()
                    .setComponents(snn, ad3ea)
                    channel.send({embeds: [embedAzan], components: [acta]});
                }
            }
        }
    });
}, 60000); 
