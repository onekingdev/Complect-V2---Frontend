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

const selectCountries = [
	{
		"title": "Afghanistan",
		"value": "Afghanistan"
	},
	{
		"title": "Åland Islands",
		"value": "Åland Islands"
	},
	{
		"title": "Albania",
		"value": "Albania"
	},
	{
		"title": "Algeria",
		"value": "Algeria"
	},
	{
		"title": "American Samoa",
		"value": "American Samoa"
	},
	{
		"title": "Andorra",
		"value": "Andorra"
	},
	{
		"title": "Angola",
		"value": "Angola"
	},
	{
		"title": "Anguilla",
		"value": "Anguilla"
	},
	{
		"title": "Antarctica",
		"value": "Antarctica"
	},
	{
		"title": "Antigua and Barbuda",
		"value": "Antigua and Barbuda"
	},
	{
		"title": "Argentina",
		"value": "Argentina"
	},
	{
		"title": "Armenia",
		"value": "Armenia"
	},
	{
		"title": "Aruba",
		"value": "Aruba"
	},
	{
		"title": "Australia",
		"value": "Australia"
	},
	{
		"title": "Austria",
		"value": "Austria"
	},
	{
		"title": "Azerbaijan",
		"value": "Azerbaijan"
	},
	{
		"title": "Bahamas",
		"value": "Bahamas"
	},
	{
		"title": "Bahrain",
		"value": "Bahrain"
	},
	{
		"title": "Bangladesh",
		"value": "Bangladesh"
	},
	{
		"title": "Barbados",
		"value": "Barbados"
	},
	{
		"title": "Belarus",
		"value": "Belarus"
	},
	{
		"title": "Belgium",
		"value": "Belgium"
	},
	{
		"title": "Belize",
		"value": "Belize"
	},
	{
		"title": "Benin",
		"value": "Benin"
	},
	{
		"title": "Bermuda",
		"value": "Bermuda"
	},
	{
		"title": "Bhutan",
		"value": "Bhutan"
	},
	{
		"title": "Bolivia (Plurinational State of)",
		"value": "Bolivia (Plurinational State of)"
	},
	{
		"title": "Bonaire, Sint Eustatius and Saba",
		"value": "Bonaire, Sint Eustatius and Saba"
	},
	{
		"title": "Bosnia and Herzegovina",
		"value": "Bosnia and Herzegovina"
	},
	{
		"title": "Botswana",
		"value": "Botswana"
	},
	{
		"title": "Bouvet Island",
		"value": "Bouvet Island"
	},
	{
		"title": "Brazil",
		"value": "Brazil"
	},
	{
		"title": "British Indian Ocean Territory",
		"value": "British Indian Ocean Territory"
	},
	{
		"title": "Brunei Darussalam",
		"value": "Brunei Darussalam"
	},
	{
		"title": "Bulgaria",
		"value": "Bulgaria"
	},
	{
		"title": "Burkina Faso",
		"value": "Burkina Faso"
	},
	{
		"title": "Burundi",
		"value": "Burundi"
	},
	{
		"title": "Cabo Verde",
		"value": "Cabo Verde"
	},
	{
		"title": "Cambodia",
		"value": "Cambodia"
	},
	{
		"title": "Cameroon",
		"value": "Cameroon"
	},
	{
		"title": "Canada",
		"value": "Canada"
	},
	{
		"title": "Cayman Islands",
		"value": "Cayman Islands"
	},
	{
		"title": "Central African Republic",
		"value": "Central African Republic"
	},
	{
		"title": "Chad",
		"value": "Chad"
	},
	{
		"title": "Chile",
		"value": "Chile"
	},
	{
		"title": "China",
		"value": "China"
	},
	{
		"title": "Christmas Island",
		"value": "Christmas Island"
	},
	{
		"title": "Cocos (Keeling) Islands",
		"value": "Cocos (Keeling) Islands"
	},
	{
		"title": "Colombia",
		"value": "Colombia"
	},
	{
		"title": "Comoros",
		"value": "Comoros"
	},
	{
		"title": "Congo",
		"value": "Congo"
	},
	{
		"title": "Congo (Democratic Republic of the)",
		"value": "Congo (Democratic Republic of the)"
	},
	{
		"title": "Cook Islands",
		"value": "Cook Islands"
	},
	{
		"title": "Costa Rica",
		"value": "Costa Rica"
	},
	{
		"title": "Côte d'Ivoire",
		"value": "Côte d'Ivoire"
	},
	{
		"title": "Croatia",
		"value": "Croatia"
	},
	{
		"title": "Cuba",
		"value": "Cuba"
	},
	{
		"title": "Curaçao",
		"value": "Curaçao"
	},
	{
		"title": "Cyprus",
		"value": "Cyprus"
	},
	{
		"title": "Czech Republic",
		"value": "Czech Republic"
	},
	{
		"title": "Denmark",
		"value": "Denmark"
	},
	{
		"title": "Djibouti",
		"value": "Djibouti"
	},
	{
		"title": "Dominica",
		"value": "Dominica"
	},
	{
		"title": "Dominican Republic",
		"value": "Dominican Republic"
	},
	{
		"title": "Ecuador",
		"value": "Ecuador"
	},
	{
		"title": "Egypt",
		"value": "Egypt"
	},
	{
		"title": "El Salvador",
		"value": "El Salvador"
	},
	{
		"title": "Equatorial Guinea",
		"value": "Equatorial Guinea"
	},
	{
		"title": "Eritrea",
		"value": "Eritrea"
	},
	{
		"title": "Estonia",
		"value": "Estonia"
	},
	{
		"title": "eSwatini",
		"value": "eSwatini"
	},
	{
		"title": "Ethiopia",
		"value": "Ethiopia"
	},
	{
		"title": "Falkland Islands (Malvinas)",
		"value": "Falkland Islands (Malvinas)"
	},
	{
		"title": "Faroe Islands",
		"value": "Faroe Islands"
	},
	{
		"title": "Fiji",
		"value": "Fiji"
	},
	{
		"title": "Finland",
		"value": "Finland"
	},
	{
		"title": "France",
		"value": "France"
	},
	{
		"title": "French Guiana",
		"value": "French Guiana"
	},
	{
		"title": "French Polynesia",
		"value": "French Polynesia"
	},
	{
		"title": "French Southern Territories",
		"value": "French Southern Territories"
	},
	{
		"title": "Gabon",
		"value": "Gabon"
	},
	{
		"title": "Gambia",
		"value": "Gambia"
	},
	{
		"title": "Georgia",
		"value": "Georgia"
	},
	{
		"title": "Germany",
		"value": "Germany"
	},
	{
		"title": "Ghana",
		"value": "Ghana"
	},
	{
		"title": "Gibraltar",
		"value": "Gibraltar"
	},
	{
		"title": "Greece",
		"value": "Greece"
	},
	{
		"title": "Greenland",
		"value": "Greenland"
	},
	{
		"title": "Grenada",
		"value": "Grenada"
	},
	{
		"title": "Guadeloupe",
		"value": "Guadeloupe"
	},
	{
		"title": "Guam",
		"value": "Guam"
	},
	{
		"title": "Guatemala",
		"value": "Guatemala"
	},
	{
		"title": "Guernsey",
		"value": "Guernsey"
	},
	{
		"title": "Guinea",
		"value": "Guinea"
	},
	{
		"title": "Guinea-Bissau",
		"value": "Guinea-Bissau"
	},
	{
		"title": "Guyana",
		"value": "Guyana"
	},
	{
		"title": "Haiti",
		"value": "Haiti"
	},
	{
		"title": "Heard Island and McDonald Islands",
		"value": "Heard Island and McDonald Islands"
	},
	{
		"title": "Holy See",
		"value": "Holy See"
	},
	{
		"title": "Honduras",
		"value": "Honduras"
	},
	{
		"title": "Hong Kong",
		"value": "Hong Kong"
	},
	{
		"title": "Hungary",
		"value": "Hungary"
	},
	{
		"title": "Iceland",
		"value": "Iceland"
	},
	{
		"title": "India",
		"value": "India"
	},
	{
		"title": "Indonesia",
		"value": "Indonesia"
	},
	{
		"title": "Iran (Islamic Republic of)",
		"value": "Iran (Islamic Republic of)"
	},
	{
		"title": "Iraq",
		"value": "Iraq"
	},
	{
		"title": "Ireland",
		"value": "Ireland"
	},
	{
		"title": "Isle of Man",
		"value": "Isle of Man"
	},
	{
		"title": "Israel",
		"value": "Israel"
	},
	{
		"title": "Italy",
		"value": "Italy"
	},
	{
		"title": "Jamaica",
		"value": "Jamaica"
	},
	{
		"title": "Japan",
		"value": "Japan"
	},
	{
		"title": "Jersey",
		"value": "Jersey"
	},
	{
		"title": "Jordan",
		"value": "Jordan"
	},
	{
		"title": "Kazakhstan",
		"value": "Kazakhstan"
	},
	{
		"title": "Kenya",
		"value": "Kenya"
	},
	{
		"title": "Kiribati",
		"value": "Kiribati"
	},
	{
		"title": "Korea (Democratic People's Republic of)",
		"value": "Korea (Democratic People's Republic of)"
	},
	{
		"title": "Korea (Republic of)",
		"value": "Korea (Republic of)"
	},
	{
		"title": "Kuwait",
		"value": "Kuwait"
	},
	{
		"title": "Kyrgyzstan",
		"value": "Kyrgyzstan"
	},
	{
		"title": "Lao People's Democratic Republic",
		"value": "Lao People's Democratic Republic"
	},
	{
		"title": "Latvia",
		"value": "Latvia"
	},
	{
		"title": "Lebanon",
		"value": "Lebanon"
	},
	{
		"title": "Lesotho",
		"value": "Lesotho"
	},
	{
		"title": "Liberia",
		"value": "Liberia"
	},
	{
		"title": "Libya",
		"value": "Libya"
	},
	{
		"title": "Liechtenstein",
		"value": "Liechtenstein"
	},
	{
		"title": "Lithuania",
		"value": "Lithuania"
	},
	{
		"title": "Luxembourg",
		"value": "Luxembourg"
	},
	{
		"title": "Macao",
		"value": "Macao"
	},
	{
		"title": "Madagascar",
		"value": "Madagascar"
	},
	{
		"title": "Malawi",
		"value": "Malawi"
	},
	{
		"title": "Malaysia",
		"value": "Malaysia"
	},
	{
		"title": "Maldives",
		"value": "Maldives"
	},
	{
		"title": "Mali",
		"value": "Mali"
	},
	{
		"title": "Malta",
		"value": "Malta"
	},
	{
		"title": "Marshall Islands",
		"value": "Marshall Islands"
	},
	{
		"title": "Martinique",
		"value": "Martinique"
	},
	{
		"title": "Mauritania",
		"value": "Mauritania"
	},
	{
		"title": "Mauritius",
		"value": "Mauritius"
	},
	{
		"title": "Mayotte",
		"value": "Mayotte"
	},
	{
		"title": "Mexico",
		"value": "Mexico"
	},
	{
		"title": "Micronesia (Federated States of)",
		"value": "Micronesia (Federated States of)"
	},
	{
		"title": "Moldova (Republic of)",
		"value": "Moldova (Republic of)"
	},
	{
		"title": "Monaco",
		"value": "Monaco"
	},
	{
		"title": "Mongolia",
		"value": "Mongolia"
	},
	{
		"title": "Montenegro",
		"value": "Montenegro"
	},
	{
		"title": "Montserrat",
		"value": "Montserrat"
	},
	{
		"title": "Morocco",
		"value": "Morocco"
	},
	{
		"title": "Mozambique",
		"value": "Mozambique"
	},
	{
		"title": "Myanmar",
		"value": "Myanmar"
	},
	{
		"title": "Namibia",
		"value": "Namibia"
	},
	{
		"title": "Nauru",
		"value": "Nauru"
	},
	{
		"title": "Nepal",
		"value": "Nepal"
	},
	{
		"title": "Netherlands",
		"value": "Netherlands"
	},
	{
		"title": "New Caledonia",
		"value": "New Caledonia"
	},
	{
		"title": "New Zealand",
		"value": "New Zealand"
	},
	{
		"title": "Nicaragua",
		"value": "Nicaragua"
	},
	{
		"title": "Niger",
		"value": "Niger"
	},
	{
		"title": "Nigeria",
		"value": "Nigeria"
	},
	{
		"title": "Niue",
		"value": "Niue"
	},
	{
		"title": "Norfolk Island",
		"value": "Norfolk Island"
	},
	{
		"title": "North Macedonia",
		"value": "North Macedonia"
	},
	{
		"title": "Northern Mariana Islands",
		"value": "Northern Mariana Islands"
	},
	{
		"title": "Norway",
		"value": "Norway"
	},
	{
		"title": "Oman",
		"value": "Oman"
	},
	{
		"title": "Pakistan",
		"value": "Pakistan"
	},
	{
		"title": "Palau",
		"value": "Palau"
	},
	{
		"title": "Palestine, State of",
		"value": "Palestine, State of"
	},
	{
		"title": "Panama",
		"value": "Panama"
	},
	{
		"title": "Papua New Guinea",
		"value": "Papua New Guinea"
	},
	{
		"title": "Paraguay",
		"value": "Paraguay"
	},
	{
		"title": "Peru",
		"value": "Peru"
	},
	{
		"title": "Philippines",
		"value": "Philippines"
	},
	{
		"title": "Pitcairn",
		"value": "Pitcairn"
	},
	{
		"title": "Poland",
		"value": "Poland"
	},
	{
		"title": "Portugal",
		"value": "Portugal"
	},
	{
		"title": "Puerto Rico",
		"value": "Puerto Rico"
	},
	{
		"title": "Qatar",
		"value": "Qatar"
	},
	{
		"title": "Réunion",
		"value": "Réunion"
	},
	{
		"title": "Romania",
		"value": "Romania"
	},
	{
		"title": "Russian Federation",
		"value": "Russian Federation"
	},
	{
		"title": "Rwanda",
		"value": "Rwanda"
	},
	{
		"title": "Saint Barthélemy",
		"value": "Saint Barthélemy"
	},
	{
		"title": "Saint Helena, Ascension and Tristan da Cunha",
		"value": "Saint Helena, Ascension and Tristan da Cunha"
	},
	{
		"title": "Saint Kitts and Nevis",
		"value": "Saint Kitts and Nevis"
	},
	{
		"title": "Saint Lucia",
		"value": "Saint Lucia"
	},
	{
		"title": "Saint Martin (French part)",
		"value": "Saint Martin (French part)"
	},
	{
		"title": "Saint Pierre and Miquelon",
		"value": "Saint Pierre and Miquelon"
	},
	{
		"title": "Saint Vincent and the Grenadines",
		"value": "Saint Vincent and the Grenadines"
	},
	{
		"title": "Samoa",
		"value": "Samoa"
	},
	{
		"title": "San Marino",
		"value": "San Marino"
	},
	{
		"title": "Sao Tome and Principe",
		"value": "Sao Tome and Principe"
	},
	{
		"title": "Saudi Arabia",
		"value": "Saudi Arabia"
	},
	{
		"title": "Senegal",
		"value": "Senegal"
	},
	{
		"title": "Serbia",
		"value": "Serbia"
	},
	{
		"title": "Seychelles",
		"value": "Seychelles"
	},
	{
		"title": "Sierra Leone",
		"value": "Sierra Leone"
	},
	{
		"title": "Singapore",
		"value": "Singapore"
	},
	{
		"title": "Sint Maarten (Dutch part)",
		"value": "Sint Maarten (Dutch part)"
	},
	{
		"title": "Slovakia",
		"value": "Slovakia"
	},
	{
		"title": "Slovenia",
		"value": "Slovenia"
	},
	{
		"title": "Solomon Islands",
		"value": "Solomon Islands"
	},
	{
		"title": "Somalia",
		"value": "Somalia"
	},
	{
		"title": "South Africa",
		"value": "South Africa"
	},
	{
		"title": "South Georgia and the South Sandwich Islands",
		"value": "South Georgia and the South Sandwich Islands"
	},
	{
		"title": "South Sudan",
		"value": "South Sudan"
	},
	{
		"title": "Spain",
		"value": "Spain"
	},
	{
		"title": "Sri Lanka",
		"value": "Sri Lanka"
	},
	{
		"title": "Sudan",
		"value": "Sudan"
	},
	{
		"title": "Suriname",
		"value": "Suriname"
	},
	{
		"title": "Svalbard and Jan Mayen",
		"value": "Svalbard and Jan Mayen"
	},
	{
		"title": "Sweden",
		"value": "Sweden"
	},
	{
		"title": "Switzerland",
		"value": "Switzerland"
	},
	{
		"title": "Syrian Arab Republic",
		"value": "Syrian Arab Republic"
	},
	{
		"title": "Taiwan, Province of China",
		"value": "Taiwan, Province of China"
	},
	{
		"title": "Tajikistan",
		"value": "Tajikistan"
	},
	{
		"title": "Tanzania, United Republic of",
		"value": "Tanzania, United Republic of"
	},
	{
		"title": "Thailand",
		"value": "Thailand"
	},
	{
		"title": "Timor-Leste",
		"value": "Timor-Leste"
	},
	{
		"title": "Togo",
		"value": "Togo"
	},
	{
		"title": "Tokelau",
		"value": "Tokelau"
	},
	{
		"title": "Tonga",
		"value": "Tonga"
	},
	{
		"title": "Trinidad and Tobago",
		"value": "Trinidad and Tobago"
	},
	{
		"title": "Tunisia",
		"value": "Tunisia"
	},
	{
		"title": "Turkey",
		"value": "Turkey"
	},
	{
		"title": "Turkmenistan",
		"value": "Turkmenistan"
	},
	{
		"title": "Turks and Caicos Islands",
		"value": "Turks and Caicos Islands"
	},
	{
		"title": "Tuvalu",
		"value": "Tuvalu"
	},
	{
		"title": "Uganda",
		"value": "Uganda"
	},
	{
		"title": "Ukraine",
		"value": "Ukraine"
	},
	{
		"title": "United Arab Emirates",
		"value": "United Arab Emirates"
	},
	{
		"title": "United Kingdom of Great Britain and Northern Ireland",
		"value": "United Kingdom of Great Britain and Northern Ireland"
	},
	{
		"title": "United States Minor Outlying Islands",
		"value": "United States Minor Outlying Islands"
	},
	{
		"title": "United States of America",
		"value": "United States of America"
	},
	{
		"title": "Uruguay",
		"value": "Uruguay"
	},
	{
		"title": "Uzbekistan",
		"value": "Uzbekistan"
	},
	{
		"title": "Vanuatu",
		"value": "Vanuatu"
	},
	{
		"title": "Venezuela (Bolivarian Republic of)",
		"value": "Venezuela (Bolivarian Republic of)"
	},
	{
		"title": "Viet Nam",
		"value": "Viet Nam"
	},
	{
		"title": "Virgin Islands (British)",
		"value": "Virgin Islands (British)"
	},
	{
		"title": "Virgin Islands (U.S.)",
		"value": "Virgin Islands (U.S.)"
	},
	{
		"title": "Wallis and Futuna",
		"value": "Wallis and Futuna"
	},
	{
		"title": "Western Sahara",
		"value": "Western Sahara"
	},
	{
		"title": "Yemen",
		"value": "Yemen"
	},
	{
		"title": "Zambia",
		"value": "Zambia"
	},
	{
		"title": "Zimbabwe",
		"value": "Zimbabwe"
	}
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


export { industries, subIndustries, jurisdictions, countries, timezones, selectCountries };
