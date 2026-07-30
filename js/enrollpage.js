const courses = {

    "web-tech":{
        name:"Play with Web Technologies",
        price:"₹499 + GST"
    },

    "c-language":{
        name:"C : The Programmer's First Language",
        price:"₹99 + GST"
    },

    "data-science":{
        name:"Data Science : Numbers to Narrative",
        price:"₹2,299 + GST"
    },

    "cpp":{
        name:"C++ : The Language of Machine",
        price:"₹199 + GST"
    },

    "ai-ml":{
        name:"AI/ML : Algorithms that Learn",
        price:"₹2,499 + GST"
    },

    "mern":{
        name:"MERN : Build-Deploy-Launch",
        price:"₹2,999 + GST"
    },

    "devops":{
        name:"DevOps & Cloud",
        price:"₹1,499 + GST"
    },

    "cyber-security":{
        name:"Cyber Security",
        price:"₹1,499 + GST"
    },

    "business-analytics":{
        name:"Business Analytics & Power BI",
        price:"₹1,499 + GST"
    },

    "flutter":{
        name:"Flutter & Mobile App",
        price:"₹1,999 + GST"
    },

    "uiux":{
        name:"UI / UX",
        price:"₹899 + GST"
    }

};

const courseSelect = document.getElementById("course");
const paymentInput = document.getElementById("payment");

function updatePrice() {

    const id = courseSelect.value;

    if(courses[id]){
        paymentInput.value = courses[id].price;
    }else{
        paymentInput.value = "";
    }

}

// Auto-select course from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if(id && courses[id]){
    courseSelect.value = id;
}

updatePrice();

// Update price whenever course changes
courseSelect.addEventListener("change", updatePrice);