const { getScriptureReferencesForTheme } = require('./src/lib/openscripture.ts');

async function testScriptureDatabase() {
  console.log('Testing Scripture Database Functionality...\n');
  
  console.log('=== Testing English Scripture References ===');
  
  try {
    const peaceRefs = await getScriptureReferencesForTheme('peace and comfort', 'Ordinary Time', 'en');
    console.log('Peace theme (English):', peaceRefs.slice(0, 3));
  } catch (error) {
    console.error('Error testing peace theme (English):', error.message);
  }
  
  try {
    const strengthRefs = await getScriptureReferencesForTheme('strength and courage', 'Ordinary Time', 'en');
    console.log('Strength theme (English):', strengthRefs.slice(0, 3));
  } catch (error) {
    console.error('Error testing strength theme (English):', error.message);
  }
  
  console.log('\n=== Testing Spanish Scripture References ===');
  
  try {
    const pazRefs = await getScriptureReferencesForTheme('paz y consuelo', 'Tiempo Ordinario', 'es');
    console.log('Paz theme (Spanish):', pazRefs.slice(0, 3));
  } catch (error) {
    console.error('Error testing paz theme (Spanish):', error.message);
  }
  
  try {
    const fuerzaRefs = await getScriptureReferencesForTheme('fuerza y valor', 'Tiempo Ordinario', 'es');
    console.log('Fuerza theme (Spanish):', fuerzaRefs.slice(0, 3));
  } catch (error) {
    console.error('Error testing fuerza theme (Spanish):', error.message);
  }
  
  console.log('\n=== Testing Liturgical Season Integration ===');
  
  try {
    const adventRefs = await getScriptureReferencesForTheme('hope', 'Advent', 'en');
    console.log('Advent season (English):', adventRefs.slice(0, 3));
  } catch (error) {
    console.error('Error testing Advent season:', error.message);
  }
  
  try {
    const christmasRefs = await getScriptureReferencesForTheme('joy', 'Christmas', 'en');
    console.log('Christmas season (English):', christmasRefs.slice(0, 3));
  } catch (error) {
    console.error('Error testing Christmas season:', error.message);
  }
  
  console.log('\n=== Scripture Database Test Complete ===');
}

testScriptureDatabase().catch(console.error);
