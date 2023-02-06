'use strict'

const { faker } = require('@faker-js/faker/locale/zh_TW')
faker.locale = 'zh_TW'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const textName = '動軍中照而軍地安時的必問新媽建福們各期開可靈毛弟葉死的印信家局方非防際公不始還小兩向少容管美在飛的車件地入中照而軍當然財現當沒寶來學走也個必是力孩語是國陸一是兒母的組學同元他著只造有態水車當然財現當沒寶來眼共的山送在是改要想對藥可公人本這器取導家常上式他人計與標成山產去風官策員民師考認原般們總時體禮當業我站權如行著前需走味較是重物邊得四速待爸和舉必問新媽學走也個必是力孩語是國識這由國書斷天處服是人開物頭理策此構女類或遊發政口不全治情面大題進和向樣夫馬市廣不海景張及無訴國名陸電交們女和從水經四外之到全三高有建福們各期開可靈毛弟葉死的印信家局方非少果相過朋不個的合軍空常我望受次的書我般們總時需走味較是重物也專形議的廠李無氣歡數半之入少來股知司國名調只運生是會你集成我收負數信臺紀裡很個南知盡跑實度小城地精樣微點比發下學子之大說不有其高關王滿清算不確明出那之西來法像只天乎人著質何建安情成學氣'
    const style = ['6L/袋', '30包/盒', '20包/盒', '3L/袋']
    await queryInterface.bulkInsert('Products',
      Array.from({ length: 20 }).map((d, i) => ({
        name: textName.slice(i * 7 + 1, i * 7 + 7),
        price: faker.commerce.price(1000, 8000, 0),
        description: style[Math.floor(i % 4)],
        created_at: new Date(),
        updated_at: new Date(),
        Category_id: categories[Math.floor(i / 10)].id,
        is_on_shelves: 1
      })), {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
}
