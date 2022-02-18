import '../assets/css/style.css'

const app = document.getElementById('app') as HTMLDivElement

app.innerHTML = `
    <h1>JavaScript HTML5 APIs</h1>
    <div class='uploader'>
        <h2>Upload your files</h2>
        <div class='dropzone'>🗂 Drag to Upload!</div>
    </div>

    <style>
    .uploader {
        box-sizing: border-box;
        max-width: 90%;
        border-radius: 10px;
        border-bottom: 3px solid #d2d5da;
        margin: 25px auto;
        padding: 25px;
        background: #fff;
    }
    .dragme {
        background: #ce1f99;
        border-radius: 5px;
        width: 50px;
        height: 50px;

    }
    .dropzone {
        border-radius: 5px;
        margin-top: 25px;
        padding: 25px;
        border: 2px dashed #d2d5da;
    }
    .active {
        background: #ebfff6;
        border-color: #24b373;
    }
    </style>
   
`

const init = () => {
    const dropzone = document.querySelector('.dropzone') as HTMLDivElement

    dropzone.addEventListener('dragenter', (e) => {
        ;(e.target as Element).classList.add('active')
    })

    dropzone.addEventListener('dragleave', (e) => {
        ;(e.target as Element).classList.remove('active')
    })

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'copy'
        }
    })

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()
        ;(e.target as Element).classList.remove('active')

        const { files } = e.dataTransfer
    })

    document.addEventListener('dragover', (e) => e.preventDefault())
    document.addEventListener('drop', (e) => e.preventDefault())
}

if ('draggable' in document.createElement('div')) {
    init()
}
