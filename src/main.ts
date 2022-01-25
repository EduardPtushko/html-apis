import '../assets/css/style.css'

const app = document.getElementById('app') as HTMLDivElement

app.innerHTML = `
    <h1>JavaScript HTML5 APIs</h1>
    <div class='uploader'>
        <div id='item-0' class='dragme' draggable='true'></div>
        <div class='dropzone'>🎯 Drag Here!</div>
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
    const dragme = document.querySelector('.dragme') as HTMLDivElement
    const dropzone = document.querySelector('.dropzone') as HTMLDivElement

    dragme.addEventListener('dragstart', (e) => {
        e.dataTransfer?.setData('text/plain', (e.target as Element).id)
    })

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

        const id = e.dataTransfer?.getData('text/plain')
        const element = document.getElementById(id as string)
        if (element) {
            dropzone.append(element)
        }
    })
}

if ('draggable' in document.createElement('div')) {
    init()
}
