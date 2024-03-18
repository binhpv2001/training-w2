const fs = require( 'fs' );
const { faker } = require( '@faker-js/faker' );

// Hàm tạo một bản ghi giả mạo
const createFakeRecord = () => ( {
  userId: faker.number.int( { min: 10, max: 10000 } ),
  id: faker.number.int( { min: 10, max: 10000 } ),
  title: faker.lorem.words( { min: 5, max: 8 } ),
  completed: faker.datatype.boolean()
} );

// Hàm tạo dữ liệu giả mạo và ghi vào tệp JSON
const generateFakeData = ( count, filePath ) => {
  const data = [];
  for ( let i = 0; i < count; i++ ) {
    data.push( createFakeRecord() );
  }
  fs.writeFileSync( filePath, JSON.stringify( { data }, null, 2 ) );
  console.log( `Fake data has been generated and saved to ${ filePath }` );
};

module.exports = generateFakeData