var data = {};

var app = new Vue({
	el: '#app',
	data: {
		products: data
	},
	methods: {
		downloadImages () {
			var productTypes = this.products.products;
			// data.products.products.data.spirits[0]
			for(prodType in productTypes){
				for(product in productTypes[prodType]){
					// product type
					// productTypes[prodType][product].image
					if (productTypes[prodType][product].image !== "https://bottlenose.imgix.net/images/placeholder.png") {
						this.saveFile (productTypes[prodType][product].image);
					}
				}
				console.log('prodType done');
			}
			console.log('done');
		},
		saveFile (url) {
		  // Get file name from url.
		  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
		  var xhr = new XMLHttpRequest();
		  xhr.responseType = 'blob';
		  xhr.onload = function() {
		    var a = document.createElement('a');
		    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
		    a.download = filename; // Set the file name.
		    a.style.display = 'none';
		    document.body.appendChild(a);
		    a.click();
		    delete a;
		  };
		  xhr.open('GET', url);
		  xhr.send();
		}
	},
	mounted: function () {
		axios.get('data.json')
		  .then(function (response) {
		    this.data.products = response.data;
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
})