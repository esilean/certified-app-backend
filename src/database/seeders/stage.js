const Stages = require('../models/Stage')


async function generate() {

    await destroy()

    const data = [
        {
            id: 1,
            name: 'Stage One',
            title_ini: 'Welcome',
            description_ini: 'Description of Stage One',
            video_url_ini: '',
            title_end: 'Congrats!',
            description_end: 'Description of Congrats!',
            video_url_end: '',
            title_end_fail: 'Reproved!',
            description_end_fail: 'Description of Reproved!',
            video_url_end_fail: '',
            duration_min: 240,
            questions_qty: 3,
            grade_perc_min: 70,
            max_attempts: 1
        },
        {
            id: 2,
            name: 'Stage Two',
            title_ini: 'Welcome',
            description_ini: 'Description of Stage Two',
            video_url_ini: '',
            title_end: 'Congrats!',
            description_end: 'Description of Congrats!',
            video_url_end: '',
            title_end_fail: 'Reproved!',
            description_end_fail: 'Description of Reproved!',
            video_url_end_fail: '',
            duration_min: 120,
            questions_qty: 0,
            grade_perc_min: 100,
            max_attempts: 3
        }        
    ]

    Stages.bulkCreate(data)


}

async function destroy() {

    await Stages.destroy({ where: {}, })

}

module.exports = {
    generate,
    destroy
}