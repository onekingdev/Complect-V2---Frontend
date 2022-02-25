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
	{ "title": "Afghanistan", "value": "AF" },
	{ "title": "Åland Islands", "value": "AX" },
	{ "title": "Albania", "value": "AL" },
	{ "title": "Algeria", "value": "DZ" },
	{ "title": "American Samoa", "value": "AS" },
	{ "title": "AndorrA", "value": "AD" },
	{ "title": "Angola", "value": "AO" },
	{ "title": "Anguilla", "value": "AI" },
	{ "title": "Antarctica", "value": "AQ" },
	{ "title": "Antigua and Barbuda", "value": "AG" },
	{ "title": "Argentina", "value": "AR" },
	{ "title": "Armenia", "value": "AM" },
	{ "title": "Aruba", "value": "AW" },
	{ "title": "Australia", "value": "AU" },
	{ "title": "Austria", "value": "AT" },
	{ "title": "Azerbaijan", "value": "AZ" },
	{ "title": "Bahamas", "value": "BS" },
	{ "title": "Bahrain", "value": "BH" },
	{ "title": "Bangladesh", "value": "BD" },
	{ "title": "Barbados", "value": "BB" },
	{ "title": "Belarus", "value": "BY" },
	{ "title": "Belgium", "value": "BE" },
	{ "title": "Belize", "value": "BZ" },
	{ "title": "Benin", "value": "BJ" },
	{ "title": "Bermuda", "value": "BM" },
	{ "title": "Bhutan", "value": "BT" },
	{ "title": "Bolivia", "value": "BO" },
	{ "title": "Bosnia and Herzegovina", "value": "BA" },
	{ "title": "Botswana", "value": "BW" },
	{ "title": "Bouvet Island", "value": "BV" },
	{ "title": "Brazil", "value": "BR" },
	{ "title": "British Indian Ocean Territory", "value": "IO" },
	{ "title": "Brunei Darussalam", "value": "BN" },
	{ "title": "Bulgaria", "value": "BG" },
	{ "title": "Burkina Faso", "value": "BF" },
	{ "title": "Burundi", "value": "BI" },
	{ "title": "Cambodia", "value": "KH" },
	{ "title": "Cameroon", "value": "CM" },
	{ "title": "Canada", "value": "CA" },
	{ "title": "Cape Verde", "value": "CV" },
	{ "title": "Cayman Islands", "value": "KY" },
	{ "title": "Central African Republic", "value": "CF" },
	{ "title": "Chad", "value": "TD" },
	{ "title": "Chile", "value": "CL" },
	{ "title": "China", "value": "CN" },
	{ "title": "Christmas Island", "value": "CX" },
	{ "title": "Cocos (Keeling) Islands", "value": "CC" },
	{ "title": "Colombia", "value": "CO" },
	{ "title": "Comoros", "value": "KM" },
	{ "title": "Congo", "value": "CG" },
	{ "title": "Congo, The Democratic Republic of the", "value": "CD" },
	{ "title": "Cook Islands", "value": "CK" },
	{ "title": "Costa Rica", "value": "CR" },
	{ "title": "Cote D'Ivoire", "value": "CI" },
	{ "title": "Croatia", "value": "HR" },
	{ "title": "Cuba", "value": "CU" },
	{ "title": "Cyprus", "value": "CY" },
	{ "title": "Czech Republic", "value": "CZ" },
	{ "title": "Denmark", "value": "DK" },
	{ "title": "Djibouti", "value": "DJ" },
	{ "title": "Dominica", "value": "DM" },
	{ "title": "Dominican Republic", "value": "DO" },
	{ "title": "Ecuador", "value": "EC" },
	{ "title": "Egypt", "value": "EG" },
	{ "title": "El Salvador", "value": "SV" },
	{ "title": "Equatorial Guinea", "value": "GQ" },
	{ "title": "Eritrea", "value": "ER" },
	{ "title": "Estonia", "value": "EE" },
	{ "title": "Ethiopia", "value": "ET" },
	{ "title": "Falkland Islands (Malvinas)", "value": "FK" },
	{ "title": "Faroe Islands", "value": "FO" },
	{ "title": "Fiji", "value": "FJ" },
	{ "title": "Finland", "value": "FI" },
	{ "title": "France", "value": "FR" },
	{ "title": "French Guiana", "value": "GF" },
	{ "title": "French Polynesia", "value": "PF" },
	{ "title": "French Southern Territories", "value": "TF" },
	{ "title": "Gabon", "value": "GA" },
	{ "title": "Gambia", "value": "GM" },
	{ "title": "Georgia", "value": "GE" },
	{ "title": "Germany", "value": "DE" },
	{ "title": "Ghana", "value": "GH" },
	{ "title": "Gibraltar", "value": "GI" },
	{ "title": "Greece", "value": "GR" },
	{ "title": "Greenland", "value": "GL" },
	{ "title": "Grenada", "value": "GD" },
	{ "title": "Guadeloupe", "value": "GP" },
	{ "title": "Guam", "value": "GU" },
	{ "title": "Guatemala", "value": "GT" },
	{ "title": "Guernsey", "value": "GG" },
	{ "title": "Guinea", "value": "GN" },
	{ "title": "Guinea-Bissau", "value": "GW" },
	{ "title": "Guyana", "value": "GY" },
	{ "title": "Haiti", "value": "HT" },
	{ "title": "Heard Island and Mcdonald Islands", "value": "HM" },
	{ "title": "Holy See (Vatican City State)", "value": "VA" },
	{ "title": "Honduras", "value": "HN" },
	{ "title": "Hong Kong", "value": "HK" },
	{ "title": "Hungary", "value": "HU" },
	{ "title": "Iceland", "value": "IS" },
	{ "title": "India", "value": "IN" },
	{ "title": "Indonesia", "value": "ID" },
	{ "title": "Iran, Islamic Republic Of", "value": "IR" },
	{ "title": "Iraq", "value": "IQ" },
	{ "title": "Ireland", "value": "IE" },
	{ "title": "Isle of Man", "value": "IM" },
	{ "title": "Israel", "value": "IL" },
	{ "title": "Italy", "value": "IT" },
	{ "title": "Jamaica", "value": "JM" },
	{ "title": "Japan", "value": "JP" },
	{ "title": "Jersey", "value": "JE" },
	{ "title": "Jordan", "value": "JO" },
	{ "title": "Kazakhstan", "value": "KZ" },
	{ "title": "Kenya", "value": "KE" },
	{ "title": "Kiribati", "value": "KI" },
	{ "title": "Korea, Democratic People'S Republic of", "value": "KP" },
	{ "title": "Korea, Republic of", "value": "KR" },
	{ "title": "Kuwait", "value": "KW" },
	{ "title": "Kyrgyzstan", "value": "KG" },
	{ "title": "Lao People'S Democratic Republic", "value": "LA" },
	{ "title": "Latvia", "value": "LV" },
	{ "title": "Lebanon", "value": "LB" },
	{ "title": "Lesotho", "value": "LS" },
	{ "title": "Liberia", "value": "LR" },
	{ "title": "Libyan Arab Jamahiriya", "value": "LY" },
	{ "title": "Liechtenstein", "value": "LI" },
	{ "title": "Lithuania", "value": "LT" },
	{ "title": "Luxembourg", "value": "LU" },
	{ "title": "Macao", "value": "MO" },
	{ "title": "Macedonia, The Former Yugoslav Republic of", "value": "MK" },
	{ "title": "Madagascar", "value": "MG" },
	{ "title": "Malawi", "value": "MW" },
	{ "title": "Malaysia", "value": "MY" },
	{ "title": "Maldives", "value": "MV" },
	{ "title": "Mali", "value": "ML" },
	{ "title": "Malta", "value": "MT" },
	{ "title": "Marshall Islands", "value": "MH" },
	{ "title": "Martinique", "value": "MQ" },
	{ "title": "Mauritania", "value": "MR" },
	{ "title": "Mauritius", "value": "MU" },
	{ "title": "Mayotte", "value": "YT" },
	{ "title": "Mexico", "value": "MX" },
	{ "title": "Micronesia, Federated States of", "value": "FM" },
	{ "title": "Moldova, Republic of", "value": "MD" },
	{ "title": "Monaco", "value": "MC" },
	{ "title": "Mongolia", "value": "MN" },
	{ "title": "Montserrat", "value": "MS" },
	{ "title": "Morocco", "value": "MA" },
	{ "title": "Mozambique", "value": "MZ" },
	{ "title": "Myanmar", "value": "MM" },
	{ "title": "Namibia", "value": "NA" },
	{ "title": "Nauru", "value": "NR" },
	{ "title": "Nepal", "value": "NP" },
	{ "title": "Netherlands", "value": "NL" },
	{ "title": "Netherlands Antilles", "value": "AN" },
	{ "title": "New Caledonia", "value": "NC" },
	{ "title": "New Zealand", "value": "NZ" },
	{ "title": "Nicaragua", "value": "NI" },
	{ "title": "Niger", "value": "NE" },
	{ "title": "Nigeria", "value": "NG" },
	{ "title": "Niue", "value": "NU" },
	{ "title": "Norfolk Island", "value": "NF" },
	{ "title": "Northern Mariana Islands", "value": "MP" },
	{ "title": "Norway", "value": "NO" },
	{ "title": "Oman", "value": "OM" },
	{ "title": "Pakistan", "value": "PK" },
	{ "title": "Palau", "value": "PW" },
	{ "title": "Palestinian Territory, Occupied", "value": "PS" },
	{ "title": "Panama", "value": "PA" },
	{ "title": "Papua New Guinea", "value": "PG" },
	{ "title": "Paraguay", "value": "PY" },
	{ "title": "Peru", "value": "PE" },
	{ "title": "Philippines", "value": "PH" },
	{ "title": "Pitcairn", "value": "PN" },
	{ "title": "Poland", "value": "PL" },
	{ "title": "Portugal", "value": "PT" },
	{ "title": "Puerto Rico", "value": "PR" },
	{ "title": "Qatar", "value": "QA" },
	{ "title": "Reunion", "value": "RE" },
	{ "title": "Romania", "value": "RO" },
	{ "title": "Russian Federation", "value": "RU" },
	{ "title": "RWANDA", "value": "RW" },
	{ "title": "Saint Helena", "value": "SH" },
	{ "title": "Saint Kitts and Nevis", "value": "KN" },
	{ "title": "Saint Lucia", "value": "LC" },
	{ "title": "Saint Pierre and Miquelon", "value": "PM" },
	{ "title": "Saint Vincent and the Grenadines", "value": "VC" },
	{ "title": "Samoa", "value": "WS" },
	{ "title": "San Marino", "value": "SM" },
	{ "title": "Sao Tome and Principe", "value": "ST" },
	{ "title": "Saudi Arabia", "value": "SA" },
	{ "title": "Senegal", "value": "SN" },
	{ "title": "Serbia and Montenegro", "value": "CS" },
	{ "title": "Seychelles", "value": "SC" },
	{ "title": "Sierra Leone", "value": "SL" },
	{ "title": "Singapore", "value": "SG" },
	{ "title": "Slovakia", "value": "SK" },
	{ "title": "Slovenia", "value": "SI" },
	{ "title": "Solomon Islands", "value": "SB" },
	{ "title": "Somalia", "value": "SO" },
	{ "title": "South Africa", "value": "ZA" },
	{ "title": "South Georgia and the South Sandwich Islands", "value": "GS" },
	{ "title": "Spain", "value": "ES" },
	{ "title": "Sri Lanka", "value": "LK" },
	{ "title": "Sudan", "value": "SD" },
	{ "title": "Suriname", "value": "SR" },
	{ "title": "Svalbard and Jan Mayen", "value": "SJ" },
	{ "title": "Swaziland", "value": "SZ" },
	{ "title": "Sweden", "value": "SE" },
	{ "title": "Switzerland", "value": "CH" },
	{ "title": "Syrian Arab Republic", "value": "SY" },
	{ "title": "Taiwan, Province of China", "value": "TW" },
	{ "title": "Tajikistan", "value": "TJ" },
	{ "title": "Tanzania, United Republic of", "value": "TZ" },
	{ "title": "Thailand", "value": "TH" },
	{ "title": "Timor-Leste", "value": "TL" },
	{ "title": "Togo", "value": "TG" },
	{ "title": "Tokelau", "value": "TK" },
	{ "title": "Tonga", "value": "TO" },
	{ "title": "Trinidad and Tobago", "value": "TT" },
	{ "title": "Tunisia", "value": "TN" },
	{ "title": "Turkey", "value": "TR" },
	{ "title": "Turkmenistan", "value": "TM" },
	{ "title": "Turks and Caicos Islands", "value": "TC" },
	{ "title": "Tuvalu", "value": "TV" },
	{ "title": "Uganda", "value": "UG" },
	{ "title": "Ukraine", "value": "UA" },
	{ "title": "United Arab Emirates", "value": "AE" },
	{ "title": "United Kingdom", "value": "GB" },
	{ "title": "United States", "value": "US" },
	{ "title": "United States Minor Outlying Islands", "value": "UM" },
	{ "title": "Uruguay", "value": "UY" },
	{ "title": "Uzbekistan", "value": "UZ" },
	{ "title": "Vanuatu", "value": "VU" },
	{ "title": "Venezuela", "value": "VE" },
	{ "title": "Viet Nam", "value": "VN" },
	{ "title": "Virgin Islands, British", "value": "VG" },
	{ "title": "Virgin Islands, U.S.", "value": "VI" },
	{ "title": "Wallis and Futuna", "value": "WF" },
	{ "title": "Western Sahara", "value": "EH" },
	{ "title": "Yemen", "value": "YE" },
	{ "title": "Zambia", "value": "ZM" },
	{ "title": "Zimbabwe", "value": "ZW" }
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
