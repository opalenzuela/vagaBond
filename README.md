vagaBond
========

Minimalistic MVC and Routing tool for Javascript

Routing example
---------------
In the following example, we can see in action the routing module of VagaBond. The #vbbc will be populated with the breadcrumbs of the navigation.

		<html>
    	<head>
      	<title>vagaBond JS example</title>
      </head>
  		<body>
				<div id='vbbc'></div>		
  			<script src="vagabond.js"></script>
  			<center>
					<a onclick="vagabond.goBack();">Back</a> - 
					<a onclick="vagabond.travelTo('index.html');">Next</a>
				</center>
    	</body>
    </html>

MVC example
-----------
In this example, we can see in action the MVC script. By clicking the links, all data in the forms will be updated according to the selected object. When the data is modified, it will automatically update the object as well.

		<html>
			<head>
				<script>
					var MyObject1 =  {
						Name:"Anne",
						Age: "28",
						Birthday: "1984-12-13",
					};
					var MyObject2 =  {
						Name:"John",
						Age: "33",
						Birthday: "1979-11-03",
					};
				 
				</script>
			</head>
			<body>
				<script src="vagabond.js"></script>
				<center>
					<a onclick="uMVC('MyObject1');">Object 1</a> -
					<a onclick="uMVC('MyObject2');">Object 2</a>
				</center>
				
				<div id='main'>
            <label for="Name">Name</label>
            <input id="Name" name="Name" type="text" /><br/>
            <label for="Age">Age</label>
            <input id="Age" name="Age" type="number"><br/>
            <label for="Birthday">Birthday</label>
            <input id="Birthday" name="Birthday" type="date"><br/>
				</div>
				
			</body>
		</html>
