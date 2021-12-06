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

const subindustries_business = [
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
];

const subindustries_specialist = [
	{
		"value": 2.0,
		"title": "AML/KYC (Banking)"
	},
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
];

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
	{ "title": "Africa - Algiers" },
	{ "title": "Africa - Cairo" },
	{ "title": "Africa - Casablanca" },
	{ "title": "Africa - Harare" },
	{ "title": "Africa - Johannesburg" },
	{ "title": "Africa - Monrovia" },
	{ "title": "Africa - Nairobi" },
	{ "title": "America - Bogota" },
	{ "title": "America - Buenos Aires, Argentina" },
	{ "title": "America - Caracas" },
	{ "title": "America - Chicago" },
	{ "title": "America - Chihuahua" },
	{ "title": "America - Denver" },
	{ "title": "America - Godthab" },
	{ "title": "America - Guatemala" },
	{ "title": "America - Guyana" },
	{ "title": "America - Halifax" },
	{ "title": "America - Indianapolis, Indiana" },
	{ "title": "America - Juneau" },
	{ "title": "America - La Paz" },
	{ "title": "America - Lima" },
	{ "title": "America - Lima" },
	{ "title": "America - Los Angeles" },
	{ "title": "America - Mazatlan" },
	{ "title": "America - Mexico City" },
	{ "title": "America - Mexico City" },
	{ "title": "America - Monterrey" },
	{ "title": "America - Montevideo" },
	{ "title": "America - New York" },
	{ "title": "America - Phoenix" },
	{ "title": "America - Puerto Rico" },
	{ "title": "America - Regina" },
	{ "title": "America - Santiago" },
	{ "title": "America - Sao Paulo" },
	{ "title": "America - St Johns" },
	{ "title": "America - Tijuana" },
	{ "title": "Asia - Almaty" },
	{ "title": "Asia - Baghdad" },
	{ "title": "Asia - Baku" },
	{ "title": "Asia - Bangkok" },
	{ "title": "Asia - Bangkok" },
	{ "title": "Asia - Chongqing" },
	{ "title": "Asia - Colombo" },
	{ "title": "Asia - Dhaka" },
	{ "title": "Asia - Dhaka" },
	{ "title": "Asia - Hong Kong" },
	{ "title": "Asia - Irkutsk" },
	{ "title": "Asia - Jakarta" },
	{ "title": "Asia - Jerusalem" },
	{ "title": "Asia - Kabul" },
	{ "title": "Asia - Kamchatka" },
	{ "title": "Asia - Karachi" },
	{ "title": "Asia - Karachi" },
	{ "title": "Asia - Kathmandu" },
	{ "title": "Asia - Kolkata" },
	{ "title": "Asia - Kolkata" },
	{ "title": "Asia - Kolkata" },
	{ "title": "Asia - Kolkata" },
	{ "title": "Asia - Krasnoyarsk" },
	{ "title": "Asia - Kuala Lumpur" },
	{ "title": "Asia - Kuwait" },
	{ "title": "Asia - Magadan" },
	{ "title": "Asia - Muscat" },
	{ "title": "Asia - Muscat" },
	{ "title": "Asia - Novosibirsk" },
	{ "title": "Asia - Rangoon" },
	{ "title": "Asia - Riyadh" },
	{ "title": "Asia - Seoul" },
	{ "title": "Asia - Shanghai" },
	{ "title": "Asia - Singapore" },
	{ "title": "Asia - Srednekolymsk" },
	{ "title": "Asia - Taipei" },
	{ "title": "Asia - Tashkent" },
	{ "title": "Asia - Tbilisi" },
	{ "title": "Asia - Tehran" },
	{ "title": "Asia - Tokyo" },
	{ "title": "Asia - Tokyo" },
	{ "title": "Asia - Tokyo" },
	{ "title": "Asia - Ulaanbaatar" },
	{ "title": "Asia - Urumqi" },
	{ "title": "Asia - Vladivostok" },
	{ "title": "Asia - Yakutsk" },
	{ "title": "Asia - Yekaterinburg" },
	{ "title": "Asia - Yerevan" },
	{ "title": "Atlantic - Azores" },
	{ "title": "Atlantic - Cape Verde" },
	{ "title": "Atlantic - South Georgia" },
	{ "title": "Australia - Adelaide" },
	{ "title": "Australia - Brisbane" },
	{ "title": "Australia - Darwin" },
	{ "title": "Australia - Hobart" },
	{ "title": "Australia - Melbourne" },
	{ "title": "Australia - Melbourne" },
	{ "title": "Australia - Perth" },
	{ "title": "Australia - Sydney" },
	{ "title": "Etc - GMT+12" },
	{ "title": "Etc - UTC" },
	{ "title": "Europe - Amsterdam" },
	{ "title": "Europe - Athens" },
	{ "title": "Europe - Belgrade" },
	{ "title": "Europe - Berlin" },
	{ "title": "Europe - Bratislava" },
	{ "title": "Europe - Brussels" },
	{ "title": "Europe - Bucharest" },
	{ "title": "Europe - Budapest" },
	{ "title": "Europe - Copenhagen" },
	{ "title": "Europe - Dublin" },
	{ "title": "Europe - Helsinki" },
	{ "title": "Europe - Istanbul" },
	{ "title": "Europe - Kaliningrad" },
	{ "title": "Europe - Kiev" },
	{ "title": "Europe - Lisbon" },
	{ "title": "Europe - Ljubljana" },
	{ "title": "Europe - London" },
	{ "title": "Europe - London" },
	{ "title": "Europe - Madrid" },
	{ "title": "Europe - Minsk" },
	{ "title": "Europe - Moscow" },
	{ "title": "Europe - Moscow" },
	{ "title": "Europe - Paris" },
	{ "title": "Europe - Prague" },
	{ "title": "Europe - Riga" },
	{ "title": "Europe - Rome" },
	{ "title": "Europe - Samara" },
	{ "title": "Europe - Sarajevo" },
	{ "title": "Europe - Skopje" },
	{ "title": "Europe - Sofia" },
	{ "title": "Europe - Stockholm" },
	{ "title": "Europe - Tallinn" },
	{ "title": "Europe - Vienna" },
	{ "title": "Europe - Vilnius" },
	{ "title": "Europe - Volgograd" },
	{ "title": "Europe - Warsaw" },
	{ "title": "Europe - Zagreb" },
	{ "title": "Europe - Zurich" },
	{ "title": "Europe - Zurich" },
	{ "title": "Pacific - Apia" },
	{ "title": "Pacific - Auckland" },
	{ "title": "Pacific - Auckland" },
	{ "title": "Pacific - Chatham" },
	{ "title": "Pacific - Fakaofo" },
	{ "title": "Pacific - Fiji" },
	{ "title": "Pacific - Guadalcanal" },
	{ "title": "Pacific - Guam" },
	{ "title": "Pacific - Honolulu" },
	{ "title": "Pacific - Majuro" },
	{ "title": "Pacific - Midway" },
	{ "title": "Pacific - Noumea" },
	{ "title": "Pacific - Pago Pago" },
	{ "title": "Pacific - Port Moresby" },
	{ "title": "Pacific - Tongatapu" }
];


export { industries, subindustries_business, subindustries_specialist, jurisdictions, countries, timezones };
