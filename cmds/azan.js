const { PrayerTimes, CalculationMethod } = require('adhan');
const mongoose = require('mongoose');
const fileSchema = require('../schema/azanSchema');
const moment = require('moment-timezone');
const { PermissionsBitField, SlashCommandBuilder, ChannelType, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

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


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ضبط')
        .addSubcommand(S => S.setName('الاذان').setDescription('تعيين قناة لإرسال إشعارات الصلاة')
        .setDescription('تعيين قناة لإرسال إشعارات الصلاة')
        .addStringOption(option =>
            option.setName('country')
                .setDescription('اختر دولتك للحصول على مواعيد الصلاة')
                .setRequired(true)
                .addChoices(
                    { name: 'مصر', value: 'مصر' },
                    { name: 'السعودية', value: 'السعودية' },
                    { name: 'الإمارات', value: 'الإمارات' },
                    { name: 'الجزائر', value: 'الجزائر' },
                    { name: 'الأردن', value: 'الأردن' },
                    { name: 'المغرب', value: 'المغرب' },
                    { name: 'العراق', value: 'العراق' },
                    { name: 'الكويت', value: 'الكويت' },
                    { name: 'قطر', value: 'قطر' },
                    { name: 'تونس', value: 'تونس' },
                    { name: 'البحرين', value: 'البحرين' },
                    { name: 'لبنان', value: 'لبنان' },
                    { name: 'السودان', value: 'السودان' },
                    { name: 'ليبيا', value: 'ليبيا' },
                    { name: 'فلسطين', value: 'فلسطين' },
                    { name: 'سوريا', value: 'سوريا' },
                    { name: 'عمان', value: 'عمان' },
                    { name: 'موريتانيا', value: 'موريتانيا' },
                    { name: 'الصومال', value: 'الصومال' },
                    { name: 'جيبوتي', value: 'جيبوتي' },
                    { name: 'جزر القمر', value: 'جزر القمر' },
                    { name: 'اليمن', value: 'اليمن' },
                    { name: 'United Kingdom', value: 'United Kingdom' },
                    { name: 'Germany', value: 'Germany' },
                    { name: 'Pakistan', value: 'Pakistan' }
                ))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('اختر القناة التي تريد تعيينها')
                .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
                .setRequired(false))),

    execute: async (int) => {
        await int.deferReply();
        const channel = int.options.getChannel('channel') || int.channel;
        const country = int.options.getString('country');
        const bot = int.guild.members.me;
        const { lat, lon, timezone } = countries[country];
if (!bot.permissionsIn(channel).has(PermissionsBitField.Flags.ViewChannel)) {
            return int.editReply({ content: '❌ لا أستطيع رؤية هذه القناة!' });
        }
        if (!int.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return int.editReply({ content: '❌ لا تملك صلاحيات كافية لإجراء هذا الأمر!' });
        }

        if(!int.guild) return;
        const dataFile = await fileSchema.findOne({ guildId: int.guild.id });
        if (dataFile && bot.permissionsIn(channel).has(PermissionsBitField.Flags.ViewChannel)) {
            const embed = new EmbedBuilder()
                .setTitle('⚠️ يوجد بيانات الخادم بالفعل')
                .setDescription('هل تريد تحديث البيانات أم حذفها؟')
                .setColor(Colors.DarkerGrey)
                .setThumbnail(int.guild.iconURL())
                .setFooter({ text: 'يرجى اتخاذ إجراء.' });

            const buttonUpdate = new ButtonBuilder()
                .setCustomId(`updateButton_${channel.id}_${country}_${lon}_${lat}`)
                .setLabel('تحديث')
                .setStyle(ButtonStyle.Primary);

            const buttonDelete = new ButtonBuilder()
                .setCustomId('deleteButton')
                .setLabel('حذف')
                .setStyle(ButtonStyle.Danger);

            const actionRow = new ActionRowBuilder()
                .addComponents(buttonDelete, buttonUpdate);

            await int.deleteReply();
            return await int.followUp({ embeds: [embed], ephemeral: true, components: [actionRow] });
        }else if(dataFile && !bot.permissionsIn(channel).has(PermissionsBitField.Flags.ViewChannel)){
             return int.editReply({ content: '❌ لا أستطيع رؤية هذه القناة!' });
        }

        function pray(coordinates, timezone) {
            const date = moment().tz(timezone).toDate();
            const params = CalculationMethod.MuslimWorldLeague();
            const prayerTimes = new PrayerTimes(coordinates, date, params);

            return {
                fajr: moment(prayerTimes.fajr).tz(timezone).format('HH:mm A'),
                dhuhr: moment(prayerTimes.dhuhr).tz(timezone).format('HH:mm A'),
                asr: moment(prayerTimes.asr).tz(timezone).format('HH:mm A'),
                maghrib: moment(prayerTimes.maghrib).tz(timezone).format('HH:mm A'),
                isha: moment(prayerTimes.isha).tz(timezone).format('HH:mm A')
            };
        }

        const coordinates = { latitude: lat, longitude: lon };
        const times = pray(coordinates, timezone);

        const saveData = new fileSchema({
            guildId: int.guild.id,
            country: country,
            channelId: channel.id,
            lat: lat,
            lon: lon
        });

        await saveData.save();

        await int.deleteReply();
        return await int.followUp({ content: `✅ تم إعداد القناة ${channel} لعرض مواعيد الصلاة لـ ${country}.` });
    }
};
