const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver')
const capabilities = Capabilities.chrome()
// Chrome起動時のオプションを指定
capabilities.set('chromeOptions', {
  args: [
    '--headless',
    '--disable-gpu',
    '--window-size=1024,768'
  ],
  w3c: false
})

// simple-test
const search = async (query) => {
  // Chromeを起動
  const driver = await new Builder()
    .withCapabilities(capabilities)
    .build()

  try {
    // naver
    await driver.get('https://www.naver.com/')
    // サイト名出力してみる
    console.log(await driver.getTitle())
    
    // 検索欄にキーワードを入力してEnter
    await driver
      .wait(until.elementLocated(By.id('query')), 6000)
      .sendKeys(query, Key.RETURN)

    // 検索結果画面のあるセッション内テキストを取得
    const result = await driver
      .wait(until.elementLocated(By.id('id_ldic_nx_section_layer')), 6000)
      .getText()
    // キーワードと結果の値を出力
    console.log(`${result}`)

  } catch(e) {
    // error
    console.log(e)
  } finally {
    // Chromeを終了
    await driver && driver.quit()
  }
}

// testで検索
search('test')
