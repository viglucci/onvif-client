const htm = require("htm");
const vhtml = require("vhtml");
const xml = htm.bind(vhtml);
const format = require('xml-formatter');

const cameraId = 'my-id';
const cameras = [
    {
        id: 1
    },
    {
        id: 2
    }
];

const string1 = format(xml`
    <cameras>
        ${cameras.map(camera => xml`
            <camera id=${camera.id} />
        `)}
    </cameras>
`);

console.log(string1);