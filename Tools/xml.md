# XML standard
current standard = version 1.0 passed in 1999
- Unicode version 2.0

XML file as document entity

## document set
to mark text and tags as plain text, use `<!CDATA[ .... ]]>`

## rules
attributes must be quoted by `'`,`"`

entity reference: 
`&`: &amp
`>`: &gt
`<`: &lt
`"`: &quot
`'`: &apos


# namespace
name conflict: mix XML documents from different xml applications
```xml
<table>
  <tr>
    <td>app</td><td>bt</td>
  </tr>
</table>

<table>
  <name>Aftrican caof</name>
  <length>120</length>
</table>
```

solve conflict using prefix, define namespace
```xml
<root>
  <h:table xmlns:h="http://www.w3.org/TR/html4">
    <h:tr>
      <h:td>app</h:td><h:td>bt</h:td>
    </h:tr>
  </h:table>

  <f:table xmlns:f="http://www.w3schools.com/furniture">
    <f:name>Aftrican caof</f:name>
    <f:length>120</f:length>
  </f:table>
</root>

<!-- OR -->

<root xmlns:h="http://www.w3.org/TR/html4"
  xmlns:f="http://www.w3schools.com/furniture">
  ...
</root>
```

default namespace, save from using prefix in all child elements
- xmlns is unique identifier (~id) within document, not necessary to be schema URI 
`xmlns="namespaceURI"`

have XML schema instance namespace available
- declares standard namespace prefix (xsi) for core namespace used in XSD
- conventional called `xsi`
`xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`

(namespace to use, location of XML schema to use for that namespace)
if omit schemaLocation, XML parser won't know where to get schema to validate
- schemaLocation give hint actual schema location
`xsi:schemaLocation="https://www.w3schools.com note.xsd"`

author of document use namespace declaration to indicate intended interpretation of anems
- may/may not schema retrievable via namespace name

## XML Schema (XSD)
xmlns is part of recommendation

can define
`xsi:type`: XML instance associate element type directly rather than through XSD
`xsi:nil`: allow empty element be valid
`xsl:noNamespaceSchemaLocation`: no namespace















