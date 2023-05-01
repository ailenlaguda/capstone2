import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';

const Report = () => {
  return (
	<Document>
	    <Page>
	      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
	        <Image src="/logo192.png" style={{ width: 50, height: 50 }} />
	        <Text style={{ marginLeft: 10, textAlign: 'center', fontSize: 20 }}>Bentuco National High School Faculty Coopertative</Text>
	      </View>
	      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Report Heading</Text>
	      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
	    </Page>
	</Document>
  );
}

export default Report;