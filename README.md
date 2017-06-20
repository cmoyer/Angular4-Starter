# Starter Project

This is a basic starter project for any new Angular 4 applications. According to the Angular CLI team, the easiest way to 
move an existing project to Angular CLI is to copy your application files into a new, empty CLI project. 

## Prerequisites

Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher. 
The best way to install these prerequisites would be to use [the node.js installer](https://nodejs.org/en/). npm is installed as a part of node. 
Once you've installed Node.js, you can **make sure you've got the very most recent version of npm using npm itself:**

`sudo npm install npm -g`

## Getting Started

1. Verify you have the Angular CLI prerequisites listed above.
2. Install the CLI globally: `npm install -g @angular/cli`.
3. Create a new app using the CLI: `ng new app-name-here`.
4. Verify that the new app was created successfully by doing the following:
    1. move into the folder of your new project: `cd app-name-here`.
    2. Test that your app works: `ng serve --open`.
5. Once that is finished, you are ready to begin setting up the starter project skeleton for your project.

### Adding our dependencies

The Starter Project has two dependencies that will need installed before we being adding files, Bootstrap and Font Awesome.
Make sure that ng serve is not running for this application. If it is, you can stop it by pressing `ctrl+c` in the terminal window.

1. Open the application in WebStorm and open a terminal window that is in your project directory.
2. Install the `bootstrap` library...
```
npm install --save bootstrap
```

3. Install the `font-awesome` library...
```
npm install --save font-awesome
```

**Note:** The `--save` flag tells npm that this will be a production dependency that will be needed when we build the application for production. 

4. Now add the two CSS libraries to your project...
```
// in .angular-cli.json 

"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "../node_modules/font-awesome/css/font-awesome.css",
  "styles.css"
]
```

### Adding our project files

Now that our dependencies have been installed, you will need to copy the following files into your new project:

* In the `assets/` directory in your new project, add the `fonts/` & `images/` directories from the Starter project. 
* Replace the `app/` directory in your new project with the `app/` directory found in the starter project. 
* Replace the `styles.css` file in your new project with the file in the Starter Project.
* Replace the `index.html` file in your new project with the file in the Starter Project.
    * Alternatively, you could just open the `index.html` in your project and add the following polyfill under the favicon link: `<script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.2.2/web-animations.min.js"></script>`
    * That polyfill code is needed to ensure that our Angular Animations run on older browsers (looking at you IE/Edge).

# Exploring the code and things you will need to change. 

The project currently contains a number of directories, subdirectories, and the root level files such as `app.component.*`, `app.module.ts`,
and `app-routing.module.ts`. In this section, I will review at a high level what most of these files are, and what you will need to remove. 

## app.module.ts

The app.module.ts file is where you tell Angular how to construct and bootstrap the app. Every application has at least one Angular module,
the *root* module that you bootstrap to launch the application. In more advanced applications, or when optimizing your Angular application,
you can create multiple Module files for various features in the application and only declare files you need in that feature alone in its own 
Module file. This would allow you to use lazy-loading to improve performance. For now, all you need to know is that this is the file that describes
how the application parts fit together. 

## Shared files

The `shared/` directory contains two files, the DropdownDirective and the MenuService. The DropdownDirective controls the actual opening and closing
of any dropdown buttons we have in the application. This is needed because unlike our prior applications, we don't import the bootstrap.js files
because we don't want anything other than Angular manipulating our DOM. To use this directive, all you need to do is add the selector `appDropdown` 
to your dropdown button. This example is the dropdown found in the menu that user's can use to logout of the application:

```
<li class="dropdown" appDropdown>
  <a style="cursor: pointer;" class="dropdown-toggle" role="button">
    <img class="menu-icon" src="../../../../assets/images/MenuPersonIcon.png"> UserName <span class="caret"></span>
  </a>
  <ul class="dropdown-menu">
    <li><a style="cursor: pointer;" (click)="onLogout()">Logout</a></li>
  </ul>
</li>
```

The MenuService is just a service that allows us to toggle the opening and closing of our slideout menu from areas other than just the MenuComponent.

### Reusable Table Component

There is a `table-layout/` directory in the core folder that contains files for a reusable and extensible table. We won't go too deep into the inner-workings of this component, but just enough to give you an idea of how it works. 

#### Table Layout Component

In the `table-layout.component.ts` file, you can see that we have 3 inputs for the class:
- records: This is the data that you want to be displayed in the table. 
- caption: This is a string that can be provided if you want to have a caption for the table. In our example, we leave this blank.
- settings: This is an array of settings that is setup in the Feature Component where you use the table to configure various aspects of the table. 

Looking at the `table-layout.component.html` template file, you can see it is just a very simple table setup. If we have a caption defined, it will be displayed at the top.
We then set our table headers by looping through the columnMaps array. We use the Directive appColumnWidth to set the column widths of each column.
These can be defined in our Feature Component Typescript file which we will review in a later section. 
We then create the body of our table by looping through the records array (which is the data we set when adding the table in our Feature Component),
and for each cell, we then loop through the columnMaps again to gather the data. We also use the appColumnWidth directive again as well as the appStyleCell directive. 
When we set the value of the cell using string interpolation `{{ record[map.access(record)] | formatCell:map.format }}` we use our customizable format-cell pipe to automatically format each cell accordingly.
 
The `layout.model.ts` file defines the classes for ColumnSetting and ColumnMap. We also set our constructor for the ColumnMap, all of the necessary getter and setter methods, 
as well as the access method which allows us to use the `alternativeKeys` feature for our custom table. The definitions for each property can be found at the top of the layout.model file.

#### Customizing your Table

Before moving on to how you use the table-layout component in your Feature Component, lets take a quick look at the 2 directives and our custom pipe.

```
  timesheetSettings: ColumnSetting[] = [
    {
      primaryKey: 'name',
      header: 'Name'
    },
    {
      primaryKey: 'hours',
      header: 'Hours',
      format: 'currency',
      // width: '10%'
    },
    {
      primaryKey: 'status',
      header: 'Status'
    },
    {
      primaryKey: 'comments',
      header: 'Comments',
      alternativeKeys: ['comment']
    }
  ];
```

##### ColumnWidth Directive

The ColumnWidth directive is used with the table-layout component to give you the ability to customize the width of each column if you so choose.
You can define this property inside your Feature Component when you set up the ColumnSetting property. If you look at the second object in the array,
you can see that we have a commented out property `width: '10%'`. The `width` property is expecting a string. This is because I wanted to allow you to decide
what values you wanted to use for your column widths. This allows you to use 10%, 10px, 10rem, etc. 

The ColumnWidth Directive is automatically applied to every cell in the header and body of your table. This is set in the `table-layout.component.html` file on the 
`<td>` tag in the header and body using the following: `[appColumnWidth]="map.width"`. If you don't define a width for your column, bootstrap will take over and adjust
your table columns accordingly. 

##### StyleCell Directive

The StyleCell Directive allows us to set various styles on each table cell based on the values we have in each dynamically created cell.
In this example, if the current row has a property that is not defined, we change the color of the text in that cell to a light grey shade.
You can also set multiple styles for each definition. In the code, you will see a second method that has been commented out. If uncommented,
that will set any undefined cell to have the 'text-align' value set to 'center'. As another example of what you can do to stylize all of the data in your table,
we have another if-statement in the ngOnInit() that checks the type of the data that is in the cell. If the data is a number, we set the alignment of that 
cell to 'left'. This can also be customized as needed in your own applications. 

The StyleCell directive is automatically applied to every cell in the body of your table. This is set in the `table-layout.component.html` file on the 
`<td>` tag in the body using the following: `[appStyleCell]="record[map.access(record)]"`. 

##### FormatCell Pipe

The FormatCell Pipe is used to automatically transform the data in your cells based on the type of data it contains. 
Looking in the `format-cell.pipe.ts` file, you can see the inner-workings of our pipe. The first thing we establish is that if an item in your data array
does not contain a property that is defined for your table, rather than leaving a blank cell, we will add 'not available' to that cell.
The StyleCell Directive will automatically format that cell as discussed above by making the text-color a light grey and setting the text-align property.
If the property contains an array of data, the FormatCell Pipe will automatically append all of the data into a string separated by ', '.

We can also specify a column to be formatted as currency by defining the format property when setting up our ColumnSetting[] array as shown above.
If you again look at the item that will be our 'hours' column, we set `format: 'currency'`. This tells our pipe that we need to format the values 
in this column as currency. 

#### Using the table-layout

Once we have all of our files in place, using this table becomes very simple. In your Feature Component, you should set up a property to house the data you wish to display. Then, you can optionally choose to setup all of the settings for your data. This is **Optional**. If you don't create the settings, our Component
will still generate the table for you, but it will contain columns for ALL of the data on each item. When you define the settings, 
only items you set up will appear as columns in your table.

When creating the settings, there are 5 total properties that can be set, however only one of them is required. 

- primaryKey(string, required) This value is what the property is called in your data array.
    - ex: If you wanted a column of first names from employee documents, your primary key would be `EmpFirstName`.
- header(string, optional) This value is what you want the column header to be.
    - ex: We wouldn't want our column header to be EmpFirstName, instead we would set the header to `First Name`.
- format(string, optional) This is where you would set the value `currency` if you wanted our Pipe to format the column as currency.
    - You could create additional values for the pipe to handle based on different parameters of the format property. 
- width(string, optional) This is where you would set a custom column width if you wanted one. 
- alternativeKeys(string, optional) This allows you to define different values to be displayed under the same column.
    - ex: If we had a 'Cost' column but the data was inconsistent and could be found in object.cost, object.total_cost, or object.funding, this allows our Component to search the alternative keys to find a value before returning 'not available'.

To add the table to your Feature Component template, all you need to do is use the selector and provide the data. Optionally you can also provide the caption and the settings for the table. 

```
<app-table-layout [records]="timesheets"
                    [caption]="' '"
                    [settings]="timesheetSettings">
  </app-table-layout>
```
## Future

As more "core" features are created that would be needed in our core application, they will be added to this project and the documentation will be 
updated accordingly.
 