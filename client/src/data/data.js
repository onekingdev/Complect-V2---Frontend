import { ref } from "vue"
import { randomMongoId, randomNumber, randomElement } from "~/_devmode/generator/components/atoms/utils.js"
import { randomFirstNames, randomLastNames } from "~/_devmode/generator/components/molecules/randomName.js"
import { randomGenders } from "~/_devmode/generator/components/molecules/randomGenders.js"
import { randomDatesInRange } from "~/_devmode/generator/components/molecules/randomDate.js"
import { wordsDict } from "~/_devmode/generator/components/dict/wordsDict.js"
const formCards = [
  {
    type: 'attestation',
    title: 'Attestation Forms',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    formCount: '1',
    routeName: 'FormLibraryEntry'
  }, {
    type: 'logs',
    title: 'Employee Log Forms',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    formCount: '1',
    routeName: 'FormLibraryEntry'
  }, {
    type: 'approval',
    title: 'Pre-Approval Forms',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    formCount: '1',
    routeName: 'FormLibraryEntry'
  }
]

const transactionData = ref([])
transactionData.value = []
for (let i = 1; i < randomNumber(5,8); i++) {
  const gender = randomGenders({ q: 1 })[0];
  const firstName = randomFirstNames({
    q: 1,
    gender
  })[0];
  const lastName = randomLastNames({ q: 1 })[0]
  const dictLength = wordsDict.length
  const wordIndex = randomNumber(0, dictLength - 1)
  transactionData.value.push({
    date:  randomDatesInRange({q: 1, shift: [-50, 0]})[0],
    _id: randomMongoId(),
    employeeName: `${firstName} ${lastName}`,
    accountNumber: Math.round( randomNumber( 100, 20000 ) / 100 ) * 100,
    ticker: wordsDict[wordIndex].toUpperCase(),
    cusip: Math.round( randomNumber( 100, 500 ) / 100 ) * 100,
    action: randomElement(['buy', 'sell']),
    quantity: Math.round( randomNumber( 200, 300 ) / 100 ) * 100,
    cost: Math.round( randomNumber( 100, 10000 ) / 100 ) * 100,
    type: randomElement(['Linked', 'Custom']),
    isReview: false,
    isApproved: false,
    additionalNotes: ''
  })
}
transactionData.value[0].reviewDescription = 'User gained clearance to buy Apple (AAPL) stock.'
transactionData.value[0].isReview = true
transactionData.value[0].isApproved = false

const securityData = ref([])
securityData.value = []
for (let i = 1; i < randomNumber(5,8); i++) {
  const dictLength = wordsDict.length
  const wordIndex = randomNumber(0, dictLength - 1)
  securityData.value.push({
    _id: randomMongoId(),
    tickerName: wordsDict[wordIndex].toUpperCase(),
    createdAt: randomDatesInRange({q: 1, shift: [-50, 0]})[0]
  })
}

const formLibraryData = [
  {
    _id: '6253c8b84d0c24ae67e36161',
    name: 'Attestation Form 1',
    type: 'attestation',
    status: 'draft',
    dateCreated: 1647000337214,
    owner: 'Alex Lim'
  },
  {
    _id: '6253c8b84d0c24ae67e36162',
    name: 'Attestation Form 2',
    type: 'attestation',
    status: 'published',
    dateCreated: 1647000337214,
    owner: 'Alex Lim'
  },
  {
    _id: '6253c8b84d0c24ae67e36163',
    name: 'Employee Log 1',
    type: 'logs',
    status: 'draft',
    dateCreated: 1647000337214,
    owner: 'Alex Lim'
  },
  {
    _id: '6253c8b84d0c24ae67e36164',
    name: 'Employee Log 2',
    type: 'logs',
    status: 'published',
    dateCreated: 1647000337214,
    owner: 'Alex Lim'
  },
  {
    _id: '6253c8b84d0c24ae67e36163',
    name: 'Pre-Approval 1',
    type: 'approval',
    status: 'draft',
    dateCreated: 1647000337214,
    owner: 'Alex Lim'
  },
  {
    _id: '6253c8b84d0c24ae67e36164',
    name: 'Pre-Approval 2',
    type: 'approval',
    status: 'published',
    dateCreated: 1647000337214,
    owner: 'Alex Lim'
  }
]

const ethicsData = [
  {
    _id: '6253c8b84d0c24ae67e36111',
    name: 'Personal Trade Monitoring',
    type: 'trade',
    status: 'new',
    lastModified: 1647000337214,
    lastModifiedBy: 'Anakin Skywalker',
    dateCreated: 1647000337214
  },
  {
    _id: '6253c8b84d0c24ae67e36112',
    name: 'Attestation',
    type: 'attestation',
    status: 'new',
    lastModified: 1647000337214,
    lastModifiedBy: 'Alex Lim',
    dateCreated: 1647000337214
  },
  {
    _id: '6253c8b84d0c24ae67e36113',
    name: 'Attestation 1',
    type: 'attestation',
    status: 'reviewed',
    lastModified: 1647000337214,
    lastModifiedBy: 'Jerry Skywalker',
    dateCreated: 1647000337214
  },
  {
    _id: '6253c8b84d0c24ae67e36114',
    name: 'Inadvertent Receipt of Client Assets',
    type: 'logs',
    status: 'new',
    lastModified: 1647000337214,
    lastModifiedBy: 'Anakin Skywalker',
    dateCreated: 1647000337214
  },
  {
    _id: '6253c8b84d0c24ae67e36115',
    name: 'Gifts & Entertainment',
    type: 'logs',
    status: 'reviewed',
    lastModified: 1647000337214,
    lastModifiedBy: 'Attestation',
    dateCreated: 1647000337214
  },
  {
    _id: '6253c8b84d0c24ae67e36116',
    name: 'Gifts & Entertainment',
    type: 'approval',
    status: 'reviewed',
    lastModified: 1647000337214,
    lastModifiedBy: 'Jerry Skywalker',
    dateCreated: 1647000337214
  }
]

const ethicsAllEntriesData = [
  {
    _id: '6253c8b84d0c24ae67e36101',
    ethics_id: '6253c8b84d0c24ae67e36111',
    dateSubmitted: 1647000337214,
    respondent: 'Jerry Skywalker',
    status: 'new',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Gift from outside company.'
  },
  {
    _id: '6253c8b84d0c24ae67e36102',
    ethics_id: '6253c8b84d0c24ae67e36112',
    dateSubmitted: 1647000337214,
    respondent: 'Jane Doe',
    status: 'reviewed',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Lorem ipsum dolor it amet.'
  },
  {
    _id: '6253c8b84d0c24ae67e36103',
    ethics_id: '6253c8b84d0c24ae67e36113',
    dateSubmitted: 1647000337214,
    respondent: 'Elaine Windu',
    status: 'new',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Lorem ipsum dolor it amet.'
  },
  {
    _id: '6253c8b84d0c24ae67e36104',
    ethics_id: '6253c8b84d0c24ae67e36113',
    dateSubmitted: 1647000337214,
    respondent: 'Jerry Skywalker',
    status: 'reviewed',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Gift from outside company.'
  },
  {
    _id: '6253c8b84d0c24ae67e36105',
    ethics_id: '6253c8b84d0c24ae67e36114',
    dateSubmitted: 1647000337214,
    respondent: 'Jane Doe',
    status: 'new',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Lorem ipsum dolor it amet.'
  },
  {
    _id: '6253c8b84d0c24ae67e36106',
    ethics_id: '6253c8b84d0c24ae67e36114',
    dateSubmitted: 1647000337214,
    respondent: 'Elaine Windu',
    status: 'reviewed',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Lorem ipsum dolor it amet.'
  },
  {
    _id: '6253c8b84d0c24ae67e36107',
    ethics_id: '6253c8b84d0c24ae67e36114',
    dateSubmitted: 1647000337214,
    respondent: 'Jerry Skywalker',
    status: 'new',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Gift from outside company.'
  },
  {
    _id: '6253c8b84d0c24ae67e36108',
    ethics_id: '6253c8b84d0c24ae67e36115',
    dateSubmitted: 1647000337214,
    respondent: 'Jane Doe',
    status: 'reviewed',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Lorem ipsum dolor it amet.'
  },
  {
    _id: '6253c8b84d0c24ae67e36109',
    ethics_id: '6253c8b84d0c24ae67e36115',
    dateSubmitted: 1647000337214,
    respondent: 'Elaine Windu',
    status: 'reviewed',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Lorem ipsum dolor it amet.'
  },
  {
    _id: '6253c8b84d0c24ae67e36110',
    ethics_id: '6253c8b84d0c24ae67e36115',
    dateSubmitted: 1647000337214,
    respondent: 'Jerry Skywalker',
    status: 'new',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Gift from outside company.'
  },
  {
    _id: '6253c8b84d0c24ae67e36111',
    ethics_id: '6253c8b84d0c24ae67e36111',
    dateSubmitted: 1647000337214,
    respondent: 'Jane Doe',
    status: 'new',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Lorem ipsum dolor it amet.'
  },
  {
    _id: '6253c8b84d0c24ae67e36112',
    ethics_id: '6253c8b84d0c24ae67e36112',
    dateSubmitted: 1647000337214,
    respondent: 'Elaine Windu',
    status: 'reviewed',
    dateReviewed: 1647000337214,
    dateOfTransaction: 1647000337214,
    giftType: 'Gift',
    externalOrganization: 'N/A',
    costOfTransaction: 1000.00,
    reasonForGift: 'Lorem ipsum dolor it amet.'
  }
]

export { formCards, formLibraryData, ethicsData, ethicsAllEntriesData, transactionData, securityData }
