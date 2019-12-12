import Api from '@/services/Api'

export default {
    getImage(filename) {
        return Api().get(`images/${filename}`)
    },
    getImages() {
        return Api().get('images')
    },
    uploadFile(formData) {
        return Api().post('upload', formData)
    }
}