export interface field_data{
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text",
      "description": "Enter your text",
      "placeholder": "Enter your text",
      "className": "form-control",
      "subtype": "text",
      "regex" : "",
	  "field_size" : 9,
	  "required":true,
      "handle":true
    },
	{
      "type": "name",
      "icon": "fa-user",
      "label": "Name",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
	  "field_size" : 9,
	  "required":true,
	  "handle":true
      
    },
	{
      "type": "website",
      "icon": "fa-globe",
      "label": "Website",
      "description": "Enter website name",
      "placeholder": "Enter website name",
      "className": "form-control",
      "subtype": "text",
	  "field_size" : 9,
	  "required":true,
      "regex" : "/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi",
	  "errorText": "Please enter a valid website",
      "handle":true
    },
	{
      "type": "rating",
      "icon": "fa-star",
      "label": "Rating",
      "description": "Rating",
      "className": "form-control",
      "subtype": "text",
      "regex" : "",
	  "required":true,
	  "field_size" : 9,
      "handle":true
    },
	{
	  "type": "heading",
      "icon": "fa-list",
      "label": "Section",
      "description": "My Title",
      "handle":true
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "required": true,
      "label": "Email",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
	  "field_size" : 9,
      "handle":true
    },
    {
      "type": "phone",
      "icon": "fa-phone",
      "label": "Phone",
      "description": "Enter your phone",
      "placeholder": "Enter your phone",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      "errorText": "Please enter a valid phone number",
	  "field_size" : 9,
	  "required":true,
      "handle":true
    },
    {
      "type": "number",
      "label": "Number",
      "icon": "fa-html5",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
	  "field_size" : 9,
      "value": "20",
	  "required":true,
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "icon":"fa-calendar",
      "label": "Date",
      "placeholder": "Date",
	  "required":true,
	  "field_size" : 9,
      "className": "form-control"
    },
    {
      "type": "datetime-local",
      "icon":"fa-calendar",
      "label": "DateTime",
      "placeholder": "Date Time",
	  "field_size" : 9,
      "className": "form-control"
    },
    {
      "type": "textarea",
      "icon":"fa-text-width",
	  "field_size" : 9,
	  "required":true,
      "label": "Textarea"
    },
	{
      "type": "textarea",
      "icon":"fa-text-width",
	  "field_size" : 9,
	  "required":true,
      "label": "Description" 
    },
    {
      "type": "paragraph",
      "icon": "fa-paragraph",
      "label": "Paragraph",
	  "field_size" : 12,
	  "required":false,
      "placeholder": "Type your text to display here only" 
    },
    {
      "type": "checkbox",
      "label": "Checkbox",
      "icon":"fa-list",
      "description": "Checkbox",
      "inline": true,
	  "field_size" : 12,
	  "required":true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon":"fa-list-ul",
      "label": "Radio",
      "description": "Radio boxes",
	  "required":true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "icon":"fa-bars",
      "label": "Select",
      "description": "Select",
      "placeholder": "Select",
	  "field_size" : 9,
      "className": "form-control",
	  "required":true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "file",
      "icon":"fa-upload",
      "label": "File Upload",
      "className": "form-control",
	  "required":false,
	  "field_size" : 12,
      "subtype": "file"
    },
	{
      "type": "image",
      "icon":"fa-image",
      "label": "Image Upload",
      "className": "form-control",
	  "required":false,
	  "field_size" : 12,
      "subtype": "file"
    },
	{
      "type": "academic_level",
      "icon":"fa-image",
      "label": "Academic Level",
      "className": "form-control",
	  "required":true,
	  "field_size" : 12,
	  "values": [
        {
          "label": "PhD",
          "value": "PhD",
          "price": 1.1
        },
        {
          "label": "Masters",
          "value": "Masters",
          "price": 1
        }
      ]
    }
	}

