const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    CARCLOTHS:   Symbol("carcloths"),
    HEADLAMPS:   Symbol("headlamps"),
    EXTRAS:  Symbol("extras")
});

module.exports = class HomeMaintenanceEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSpecies = "";
        this.sCarcloths = "";
        this.sHeadlamps= "";
        this.sExtras = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.CARCLOTHS;
                aReturn.push("Welcome to Anudeep's Home Hardware.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                if(sInput.toLowerCase() == "garbage"){
                  this.sSpecies = "garbage";
                }else if(sInput.toLowerCase() == "household") {
                  this.sSpecies = "household";
                } else {
                  this.stateCur = OrderState.WELCOMING;
                  aReturn.push("Please type GARBAGE if you want garbage items or HOUSEHOLD if you want household items.");
                  break;
                }
                aReturn.push("Would you like GARBAGE or HOUSEHOLD or NO?");
                break;
            case OrderState.CARCLOTHS:
                if(this.sSpecies == "garbage"){
                  this.stateCur = OrderState.HEADLAMPS;
                  aReturn.push("Would you like Brooms and Dustbins ?");
                }else{
                  this.stateCur = OrderState.EXTRAS;
                  aReturn.push("Would you like a Household cleaners or lightbulbs?");
                }
                if(sInput.toLowerCase()!= "no"){
                  this.sCarcloths = sInput;
                }
                break;
            case OrderState.HEADLAMPS:
                this.stateCur = OrderState.EXTRAS
                if(sInput.toLowerCase()!= "no"){
                  this.sHeadlamps = "Good quality Brooms and Dustbins";
                }
                aReturn.push("Would you like a Simonize car cloths or geeky headlamps?");
                break;
            case OrderState.EXTRAS:
                if(sInput.toLowerCase() != "no"){
                    this.sExtras = sInput;
                }
                aReturn.push("Thank-you for your order of");
                this.nTotal = 0;
                if(this.sSpecies == "garbage" && this.sCarcloths.toLowerCase() == "broom"){
                  aReturn.push("broom stick for garbage");
                  this.nTotal += 1.99;
                }else if(this.sSpecies == "garbage" && this.sCarcloths.toLowerCase == "dustbin"){
                  aReturn.push("dustbin for garbage");
                  this.nTotal += 2.99
                }else if(this.sSpecies == "household" && this.sCarcloths.toLowerCase() == "cleaners"){
                  aReturn.push("cleaners for household");
                  this.nTotal += 5.99;
                }else if(this.sSpecies == "household" && this.sCarcloths.toLowerCase == "lightbulbs"){
                  aReturn.push("light bulbs for household");
                  this.nTotal += 5.99
                }
                if(this.sHeadlamps){
                  aReturn.push(this.sHeadlamps);
                  this.nTotal += 2.99;
                }
                if(this.sExtras){
                  aReturn.push(this.sExtras);
                  this.nTotal += 2.99;
                }
                aReturn.push(`Your total comes to ${this.nTotal}`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html>

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <style type="text/css">
        ol {
            margin: 0;
            padding: 0
        }

        table td,
        table th {
            padding: 0
        }

        .c1 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left;
            height: 11pt
        }

        .c0 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c2 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c3 {
            background-color: #ffffff;
            max-width: 468pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .title {
            padding-top: 0pt;
            color: #000000;
            font-size: 26pt;
            padding-bottom: 3pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .subtitle {
            padding-top: 0pt;
            color: #666666;
            font-size: 15pt;
            padding-bottom: 16pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        li {
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        p {
            margin: 0;
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        h1 {
            padding-top: 20pt;
            color: #000000;
            font-size: 20pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h2 {
            padding-top: 18pt;
            color: #000000;
            font-size: 16pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h3 {
            padding-top: 16pt;
            color: #434343;
            font-size: 14pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h4 {
            padding-top: 14pt;
            color: #666666;
            font-size: 12pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h5 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h6 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            font-style: italic;
            orphans: 2;
            widows: 2;
            text-align: left
        }
    </style>
</head>

<body class="c3">
    <p class="c2"><span class="c0">Welcome to Anudeep&rsquo;s Home Hardware</span></p>
    <p class="c1"><span class="c0"></span></p>
    <p class="c2"><span class="c0">Text &ldquo;garbage&rdquo; or &ldquo;household&rdquo; to 519-111-1111</span></p>
    <p class="c1"><span class="c0"></span></p>
    <p class="c2"><span class="c0">All Garbage Items : 5.99</span></p>
    <p class="c1"><span class="c0"></span></p>
    <p class="c2"><span class="c0">All Household Items : 2.99</span></p>
    <p class="c1"><span class="c0"></span></p>
    <p class="c2"><span class="c0">Good Quality Brooms and Dustbins : 2.99</span></p>
    <p class="c1"><span class="c0"></span></p>
    <p class="c2"><span class="c0">We also have a selection of hardware store such as simonize car cloths, geeky
            headlamps etc. </span></p>
    <p class="c1"><span class="c0"></span></p>
</body>

</html>

     `);
  
    }
}
