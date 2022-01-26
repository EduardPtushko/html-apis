import '../assets/css/style.css'

const app = document.getElementById('app') as HTMLDivElement

app.innerHTML = `
    <h1>JavaScript HTML5 APIs</h1>
    <div class='uploader'>
        <h2>Upload your files</h2>
        <p>Accept only .png, .jpg, .svg</p>
        <input type='file' class='files' accept='image/*' multiple />
        <div class='dropzone'>🗂 Drag to Upload!</div>
        <div class='list'></div>
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
    const files = document.querySelector('.files') as HTMLInputElement
    const list = document.querySelector('.list') as HTMLDivElement

    const showFilePreview = (file: File) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', (e) => {
            const div = document.createElement('div')
            div.innerHTML = `
                <div style='display: flex;'>
                    <img
                        src='${e.target?.result}'
                        alt='${file.name}'
                        style='width: 20px; margin-right: 10px;'
                        />
                    <p>${file.name} <span>${file.size} bytes</span></p>
                </div>
            `
            list.append(div)
        })
    }

    const uploadFiles = async (files: File[]) => {
        const form = new FormData()
        ;[...files].forEach((file) => form.append(file.name, file))

        const request = await fetch('//dragdropfiles.glitch.me/upload', {
            method: 'POST',
            body: form,
        })

        return await request.json()
    }

    const isAllowedType = (file: File) => {
        return ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)
    }

    const handleFileUpload = async (files: FileList) => {
        const filesToUpload: File[] = [...files].filter(isAllowedType)

        filesToUpload.forEach(showFilePreview)

        const uploaded = await uploadFiles(filesToUpload)

        if (uploaded) {
            for (const image of uploaded.images) {
                console.log(image)
            }
        }
    }

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

        const data = e.dataTransfer
        if (data) {
            handleFileUpload(data.files)
        }
    })

    files.addEventListener('change', (e) => {
        const data = e.target as HTMLInputElement

        if (data) {
            handleFileUpload(data.files!)
        }
    })

    document.addEventListener('dragover', (e) => e.preventDefault())
    document.addEventListener('drop', (e) => e.preventDefault())
}

if ('draggable' in document.createElement('div')) {
    init()
}
