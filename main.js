import N3 from 'n3';

const fileInput = document.getElementById("source-input");
fileInput.addEventListener("change", (evt) => logTriples(evt.target.files[0]));

function logTriples(file){
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async () => {
        const parser = new N3.Parser();
        let text = reader.result;

        parser.parse(text, 
            (error, quad, prefixes) => {
                if (quad){
                    console.log(quad.subject.value, quad.predicate.value, quad.object.value);
                } else {
                    console.log("Prefixes:", prefixes);
                }
            }
        );
    };

    reader.onerror = () => {
        console.error("Error reading file:", reader.error);
    };

}
