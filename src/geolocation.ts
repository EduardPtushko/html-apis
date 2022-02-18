import '../assets/css/style.css'

const app = document.getElementById('app') as HTMLDivElement

app.innerHTML = `
    <h1>JavaScript HTML5 APIs</h1>
`
console.log(window.navigator.geolocation)

const init = () => {
    const handleSuccess = ({ coords }: GeolocationPosition) => {
        const { latitude, longitude, accuracy } = coords

        app.innerHTML += `
            <p>Accuracy: ${accuracy}m</p>
            <iframe
                width='60'
                height='250'
                frameborder='0'
                src='https://maps.google.com/maps?q=${latitude},${longitude}&amp;'

            >
            </iframe>
        `
    }
    const handleError = (error: GeolocationPositionError) => {
        switch (error.code) {
            case error.PERMISSION_DENIED: {
                console.log(error.message)
                break
            }
            case error.POSITION_UNAVAILABLE: {
                console.log(error.message)
                break
            }
            case error.TIMEOUT: {
                console.log(error.message)
                break
            }
            default: {
                console.log('Unknown error!')
            }
        }
    }

    const options = {
        timeout: 5000,
        maximumAge: 0,
        enableHighAccuracy: true,
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)
}

if ('geolocation' in window.navigator) {
    init()
}
