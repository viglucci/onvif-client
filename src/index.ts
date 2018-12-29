import htm from 'htm';
import vhtml from 'vhtml';
import format from 'xml-formatter';

const xml = htm.bind(vhtml);

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