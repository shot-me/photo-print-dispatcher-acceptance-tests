const { Photos } = require('./models')

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getNrOfPhotosToPrint() {
    const allPhotos = await Photos.findAll()
    return allPhotos.filter(photo => !photo.datePrinted ).length
}

async function showNrOfPhotosToPrint() {
    console.log('Nr of photos to print: ' + await getNrOfPhotosToPrint())
}

async function createNewPhoto() {
    const originalPhotoUrl = 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/37734077_10212160402909575_8986337451828051968_o.jpg'
    const transformedPhotoUrl = originalPhotoUrl;
    const datePrinted = null;
    const dateTransformed = new Date()
    await Photos.create({
        transformedPhotoUrl,
        originalPhotoUrl,
        datePrinted,
        dateTransformed
    })
}

async function timer(seconds) {
    for (let i = seconds; i > 0; --i) {
        console.log(i)
        await timeout(1000)
    }
}

(async function() {
    await timeout(1000)
    console.log('\nThis test should check if the printer will print a new photo')
    console.log('Running integration test in... ')
    await timer(3)

    await showNrOfPhotosToPrint()
    console.log('Adding a new photos to the db')
    await createNewPhoto()
    await showNrOfPhotosToPrint()
    const waitSeconds = 10
    console.log('Waiting ' + waitSeconds + ' seconds, after this time, we should have all photos printed! (with datePrinted !== null)')
    await timer(waitSeconds)
    if (await getNrOfPhotosToPrint() > 0) {
        console.log('TEST FAILED')
        console.log('We stille have ' + await getNrOfPhotosToPrint() + ' photos to print')
    } else {
        console.log('TEST PASSED')
    }
})()