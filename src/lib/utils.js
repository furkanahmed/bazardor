// সংখ্যাকে বাংলা সংখ্যায় রূপান্তরকারী ফাংশন (যেমন: 125 -> ১২৫)
export function toBnDigit(num) {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

// আজকের বাংলা তারিখ তৈরি করার ফাংশন
export function getBanglaDate() {
  const date = new Date();
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];

  const dayName = days[date.getDay()];
  const day = toBnDigit(date.getDate());
  const month = months[date.getMonth()];
  const year = toBnDigit(date.getFullYear());

  return `${dayName}, ${day} ${month} ${year}`;
}
