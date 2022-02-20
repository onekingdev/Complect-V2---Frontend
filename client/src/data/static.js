const jurisdictions = [
	{
		"value": 1,
		"title": "USA"
	},
	{
		"value": 2,
		"title": "Canada"
	},
	{
		"value": 3,
		"title": "Europe"
	},
	{
		"value": 4,
		"title": "Central America"
	},
	{
		"value": 5,
		"title": "South America"
	},
	{
		"value": 6,
		"title": "Australasia"
	},
	{
		"value": 7,
		"title": "Asia"
	},
	{
		"value": 8,
		"title": "Africa"
	},
	{
		"value": 9,
		"title": "Caribbean"
	},
	{
		"value": 10,
		"title": "Middle East"
	}
];

const industries = [
	{
		"value": 1,
		"title": "Broker-Dealer"
	},
	{
		"value": 2,
		"title": "Banking"
	},
	{
		"value": 4,
		"title": "Investment Adviser"
	},
	{
		"value": 9,
		"title": "Insurance Provider"
	},
	{
		"value": 10,
		"title": "Fintech"
	},
	{
		"value": 14,
		"title": "Commodities Trader"
	},
	{
		"value": 16,
		"title": "Other"
	}
];

const subIndustries = {
	"business": [
		{
			"value": 1.0,
			"title": "Broker Rep"
		},
		{
			"value": 1.1,
			"title": "Funding Portal"
		},
		{
			"value": 1.2,
			"title": "Capital Acquisition Broker"
		},
		{
			"value": 1.3,
			"title": "Limited Purpose Broker Dealer"
		},
		{
			"value": 1.4,
			"title": "Broker Dealer"
		},
		{
			"value": 1.5,
			"title": "Alternative Trading System/Exchange"
		},
		{
			"value": 2.0,
			"title": "Investment Banking"
		},
		{
			"value": 2.1,
			"title": "Retail/Commercial Banking"
		},
		{
			"value": 4.0,
			"title": "Provide advice to separately managed accounts (e.g. individuals)"
		},
		{
			"value": 4.1,
			"title": "Provide advice to mutual funds"
		},
		{
			"value": 4.2,
			"title": "Provide advice to hedge funds"
		},
		{
			"value": 4.3,
			"title": "Provide advice to private equity funds"
		},
		{
			"value": 4.4,
			"title": "Provide advice to venture capital funds"
		},
		{
			"value": 4.5,
			"title": "Provide advice to ERISA accounts"
		},
		{
			"value": 4.6,
			"title": "Provide advice to Taft-Hartley accounts"
		},
		{
			"value": 4.7,
			"title": "Provide advice to municipalities or on municipal securities"
		},
		{
			"value": 14.0,
			"title": "Commodities Pool Operator/Commodities Trading Adviser (exempt and non-exempt)"
		},
		{
			"value": 14.1,
			"title": "Futures Commission Merchant"
		},
		{
			"value": 14.2,
			"title": "Retail Foreign Exchange Dealer"
		},
		{
			"value": 14.3,
			"title": "Introducing Broker"
		},
		{
			"value": 14.4,
			"title": "Swap Dealer"
		}
	],
	"specialist": [
		{
			"value": 1.0,
			"title": "Funding portals"
		},
		{
			"value": 1.1,
			"title": "ATS/Exchanges"
		},
		{
			"value": 1.2,
			"title": "Limited purpose broker dealers"
		},
		{
			"value": 1.3,
			"title": "Capital acquisition brokers"
		},
		{
			"value": 1.4,
			"title": "Broker dealers"
		},
		{
			"value": 1.5,
			"title": "AML/KYC (Broker Dealer)"
		},
		{
			"value": 2.0,
			"title": "AML/KYC (Banking)"
		},
		{
			"value": 4.0,
			"title": "ERISA"
		},
		{
			"value": 4.1,
			"title": "GIPS"
		},
		{
			"value": 4.2,
			"title": "Mutual funds"
		},
		{
			"value": 4.3,
			"title": "Business development corporations"
		},
		{
			"value": 4.4,
			"title": "Private equity funds"
		},
		{
			"value": 4.5,
			"title": "Hedge funds"
		},
		{
			"value": 4.6,
			"title": "Venture capital funds"
		},
		{
			"value": 4.7,
			"title": "Municipal advisors"
		},
		{
			"value": 4.8,
			"title": "Financial Planners"
		},
		{
			"value": 14.0,
			"title": "CPO/CTAs (exempt and non-exempt)"
		},
		{
			"value": 14.1,
			"title": "Futures Commission Merchant"
		},
		{
			"value": 14.2,
			"title": "Retail Foreign Exchange Dealer"
		},
		{
			"value": 14.3,
			"title": "Introducing Broker"
		},
		{
			"value": 14.4,
			"title": "Swap Dealer"
		}
	]
};

// const states = [
// 	"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
// ];

const countries = [
	"Afghanistan",
	"Åland Islands",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands",
	"Colombia",
	"Comoros",
	"Congo",
	"Congo (Democratic Republic of the)",
	"Cook Islands",
	"Costa Rica",
	"Côte d'Ivoire",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"eSwatini",
	"Ethiopia",
	"Falkland Islands (Malvinas)",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (Democratic People's Republic of)",
	"Korea (Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"North Macedonia",
	"Northern Mariana Islands",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Réunion",
	"Romania",
	"Russian Federation",
	"Rwanda",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan, Province of China",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom of Great Britain and Northern Ireland",
	"United States Minor Outlying Islands",
	"United States of America",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe"
];

const timezones = [
	{ "title": "International Date Line West", "value": "Etc/GMT+12" },
	{ "title": "American Samoa", "value": "Pacific/Pago_Pago" },
	{ "title": "Midway Island", "value": "Pacific/Midway" },
	{ "title": "Hawaii", "value": "Pacific/Honolulu" },
	{ "title": "Alaska", "value": "America/Juneau" },
	{ "title": "Pacific Time (US & Canada)", "value": "America/Los_Angeles" },
	{ "title": "Tijuana", "value": "America/Tijuana" },
	{ "title": "Arizona", "value": "America/Phoenix" },
	{ "title": "Chihuahua", "value": "America/Chihuahua" },
	{ "title": "Mazatlan", "value": "America/Mazatlan" },
	{ "title": "Mountain Time (US & Canada)", "value": "America/Denver" },
	{ "title": "Central America", "value": "America/Guatemala" },
	{ "title": "Central Time (US & Canada)", "value": "America/Chicago" },
	{ "title": "Guadalajara", "value": "America/Mexico_City" },
	{ "title": "Mexico City", "value": "America/Mexico_City" },
	{ "title": "Monterrey", "value": "America/Monterrey" },
	{ "title": "Saskatchewan", "value": "America/Regina" },
	{ "title": "Bogota", "value": "America/Bogota" },
	{ "title": "Eastern Time (US & Canada)", "value": "America/New_York" },
	{ "title": "Indiana (East)", "value": "America/Indiana/Indianapolis" },
	{ "title": "Lima", "value": "America/Lima" },
	{ "title": "Quito", "value": "America/Lima" },
	{ "title": "Atlantic Time (Canada)", "value": "America/Halifax" },
	{ "title": "Caracas", "value": "America/Caracas" },
	{ "title": "Georgetown", "value": "America/Guyana" },
	{ "title": "La Paz", "value": "America/La_Paz" },
	{ "title": "Puerto Rico", "value": "America/Puerto_Rico" },
	{ "title": "Santiago", "value": "America/Santiago" },
	{ "title": "Newfoundland", "value": "America/St_Johns" },
	{ "title": "Brasilia", "value": "America/Sao_Paulo" },
	{ "title": "Buenos Aires", "value": "America/Argentina/Buenos_Aires" },
	{ "title": "Greenland", "value": "America/Godthab" },
	{ "title": "Montevideo", "value": "America/Montevideo" },
	{ "title": "Mid-Atlantic", "value": "Atlantic/South_Georgia" },
	{ "title": "Azores", "value": "Atlantic/Azores" },
	{ "title": "Cape Verde Is.", "value": "Atlantic/Cape_Verde" },
	{ "title": "Casablanca", "value": "Africa/Casablanca" },
	{ "title": "Dublin", "value": "Europe/Dublin" },
	{ "title": "Edinburgh", "value": "Europe/London" },
	{ "title": "Lisbon", "value": "Europe/Lisbon" },
	{ "title": "London", "value": "Europe/London" },
	{ "title": "Monrovia", "value": "Africa/Monrovia" },
	{ "title": "UTC", "value": "Etc/UTC" },
	{ "title": "Amsterdam", "value": "Europe/Amsterdam" },
	{ "title": "Belgrade", "value": "Europe/Belgrade" },
	{ "title": "Berlin", "value": "Europe/Berlin" },
	{ "title": "Bern", "value": "Europe/Zurich" },
	{ "title": "Bratislava", "value": "Europe/Bratislava" },
	{ "title": "Brussels", "value": "Europe/Brussels" },
	{ "title": "Budapest", "value": "Europe/Budapest" },
	{ "title": "Copenhagen", "value": "Europe/Copenhagen" },
	{ "title": "Ljubljana", "value": "Europe/Ljubljana" },
	{ "title": "Madrid", "value": "Europe/Madrid" },
	{ "title": "Paris", "value": "Europe/Paris" },
	{ "title": "Prague", "value": "Europe/Prague" },
	{ "title": "Rome", "value": "Europe/Rome" },
	{ "title": "Sarajevo", "value": "Europe/Sarajevo" },
	{ "title": "Skopje", "value": "Europe/Skopje" },
	{ "title": "Stockholm", "value": "Europe/Stockholm" },
	{ "title": "Vienna", "value": "Europe/Vienna" },
	{ "title": "Warsaw", "value": "Europe/Warsaw" },
	{ "title": "West Central Africa", "value": "Africa/Algiers" },
	{ "title": "Zagreb", "value": "Europe/Zagreb" },
	{ "title": "Zurich", "value": "Europe/Zurich" },
	{ "title": "Athens", "value": "Europe/Athens" },
	{ "title": "Bucharest", "value": "Europe/Bucharest" },
	{ "title": "Cairo", "value": "Africa/Cairo" },
	{ "title": "Harare", "value": "Africa/Harare" },
	{ "title": "Helsinki", "value": "Europe/Helsinki" },
	{ "title": "Jerusalem", "value": "Asia/Jerusalem" },
	{ "title": "Kaliningrad", "value": "Europe/Kaliningrad" },
	{ "title": "Kyiv", "value": "Europe/Kiev" },
	{ "title": "Pretoria", "value": "Africa/Johannesburg" },
	{ "title": "Riga", "value": "Europe/Riga" },
	{ "title": "Sofia", "value": "Europe/Sofia" },
	{ "title": "Tallinn", "value": "Europe/Tallinn" },
	{ "title": "Vilnius", "value": "Europe/Vilnius" },
	{ "title": "Baghdad", "value": "Asia/Baghdad" },
	{ "title": "Istanbul", "value": "Europe/Istanbul" },
	{ "title": "Kuwait", "value": "Asia/Kuwait" },
	{ "title": "Minsk", "value": "Europe/Minsk" },
	{ "title": "Moscow", "value": "Europe/Moscow" },
	{ "title": "Nairobi", "value": "Africa/Nairobi" },
	{ "title": "Riyadh", "value": "Asia/Riyadh" },
	{ "title": "St. Petersburg", "value": "Europe/Moscow" },
	{ "title": "Volgograd", "value": "Europe/Volgograd" },
	{ "title": "Tehran", "value": "Asia/Tehran" },
	{ "title": "Abu Dhabi", "value": "Asia/Muscat" },
	{ "title": "Baku", "value": "Asia/Baku" },
	{ "title": "Muscat", "value": "Asia/Muscat" },
	{ "title": "Samara", "value": "Europe/Samara" },
	{ "title": "Tbilisi", "value": "Asia/Tbilisi" },
	{ "title": "Yerevan", "value": "Asia/Yerevan" },
	{ "title": "Kabul", "value": "Asia/Kabul" },
	{ "title": "Ekaterinburg", "value": "Asia/Yekaterinburg" },
	{ "title": "Islamabad", "value": "Asia/Karachi" },
	{ "title": "Karachi", "value": "Asia/Karachi" },
	{ "title": "Tashkent", "value": "Asia/Tashkent" },
	{ "title": "Chennai", "value": "Asia/Kolkata" },
	{ "title": "Kolkata", "value": "Asia/Kolkata" },
	{ "title": "Mumbai", "value": "Asia/Kolkata" },
	{ "title": "New Delhi", "value": "Asia/Kolkata" },
	{ "title": "Sri Jayawardenepura", "value": "Asia/Colombo" },
	{ "title": "Kathmandu", "value": "Asia/Kathmandu" },
	{ "title": "Almaty", "value": "Asia/Almaty" },
	{ "title": "Astana", "value": "Asia/Dhaka" },
	{ "title": "Dhaka", "value": "Asia/Dhaka" },
	{ "title": "Urumqi", "value": "Asia/Urumqi" },
	{ "title": "Rangoon", "value": "Asia/Rangoon" },
	{ "title": "Bangkok", "value": "Asia/Bangkok" },
	{ "title": "Hanoi", "value": "Asia/Bangkok" },
	{ "title": "Jakarta", "value": "Asia/Jakarta" },
	{ "title": "Krasnoyarsk", "value": "Asia/Krasnoyarsk" },
	{ "title": "Novosibirsk", "value": "Asia/Novosibirsk" },
	{ "title": "Beijing", "value": "Asia/Shanghai" },
	{ "title": "Chongqing", "value": "Asia/Chongqing" },
	{ "title": "Hong Kong", "value": "Asia/Hong_Kong" },
	{ "title": "Irkutsk", "value": "Asia/Irkutsk" },
	{ "title": "Kuala Lumpur", "value": "Asia/Kuala_Lumpur" },
	{ "title": "Perth", "value": "Australia/Perth" },
	{ "title": "Singapore", "value": "Asia/Singapore" },
	{ "title": "Taipei", "value": "Asia/Taipei" },
	{ "title": "Ulaanbaatar", "value": "Asia/Ulaanbaatar" },
	{ "title": "Osaka", "value": "Asia/Tokyo" },
	{ "title": "Sapporo", "value": "Asia/Tokyo" },
	{ "title": "Seoul", "value": "Asia/Seoul" },
	{ "title": "Tokyo", "value": "Asia/Tokyo" },
	{ "title": "Yakutsk", "value": "Asia/Yakutsk" },
	{ "title": "Adelaide", "value": "Australia/Adelaide" },
	{ "title": "Darwin", "value": "Australia/Darwin" },
	{ "title": "Brisbane", "value": "Australia/Brisbane" },
	{ "title": "Canberra", "value": "Australia/Melbourne" },
	{ "title": "Guam", "value": "Pacific/Guam" },
	{ "title": "Hobart", "value": "Australia/Hobart" },
	{ "title": "Melbourne", "value": "Australia/Melbourne" },
	{ "title": "Port Moresby", "value": "Pacific/Port_Moresby" },
	{ "title": "Sydney", "value": "Australia/Sydney" },
	{ "title": "Vladivostok", "value": "Asia/Vladivostok" },
	{ "title": "Magadan", "value": "Asia/Magadan" },
	{ "title": "New Caledonia", "value": "Pacific/Noumea" },
	{ "title": "Solomon Is.", "value": "Pacific/Guadalcanal" },
	{ "title": "Srednekolymsk", "value": "Asia/Srednekolymsk" },
	{ "title": "Auckland", "value": "Pacific/Auckland" },
	{ "title": "Fiji", "value": "Pacific/Fiji" },
	{ "title": "Kamchatka", "value": "Asia/Kamchatka" },
	{ "title": "Marshall Is.", "value": "Pacific/Majuro" },
	{ "title": "Wellington", "value": "Pacific/Auckland" },
	{ "title": "Chatham Is.", "value": "Pacific/Chatham" },
	{ "title": "Nuku'alofa", "value": "Pacific/Tongatapu" },
	{ "title": "Samoa", "value": "Pacific/Apia" },
	{ "title": "Tokelau Is.", "value": "Pacific/Fakaofo" }
];


export { industries, subIndustries, jurisdictions, countries, timezones };
