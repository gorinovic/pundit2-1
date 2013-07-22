/**
    Provides various URIs used all around Pundit, from rdf type, label, comment
    to the predicates used to describe items and notebooks etc
    @class pundit.ns
**/
define([
    "dojo/_base/declare",
    "dojo/_base/config"
], function(declare, config) {
    return declare("pundit.Namespace", [], {

    defaultOpts: {
        debug: false,
        libName: ''
    },

    constructor: function() {
        var self = this;
        
        self.rdf = {};
        self.rdf.type = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
        self.rdf.value = "http://www.w3.org/1999/02/22-rdf-syntax-ns#value";
        self.rdf.property = "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property";
        self.rdf.XMLLiteral = "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral";
        
        self.rdfs = {};
        self.rdfs.label = "http://www.w3.org/2000/01/rdf-schema#label";
        self.rdfs.comment = "http://www.w3.org/2000/01/rdf-schema#comment";
        self.rdfs.resource = "http://www.w3.org/2000/01/rdf-schema#Resource";
        self.rdfs.literal = "http://www.w3.org/2000/01/rdf-schema#Literal";
        self.rdfs.seeAlso = "http://www.w3.org/2000/01/rdf-schema#seeAlso";
        
        /*
        // Types used to denote a webpage, a text fragment, an image, an annotation
        self.page = "http://schema.org/WebPage";
        self.image = "http://xmlns.com/foaf/0.1/Image";
        self.annotation = "http://www.openannotation.org/ns/Annotation";

        self.pundit_annotationId = "http://purl.org/pundit/ont/ao#id";
        self.pundit_annotationDate = "http://purl.org/dc/terms/created";
        self.pundit_authorName = "http://purl.org/dc/elements/1.1/creator";
        self.pundit_userName = "http://xmlns.com/foaf/0.1/name";
        self.pundit_authorURI = "http://purl.org/dc/terms/creator";
        self.pundit_hasTarget = "http://www.openannotation.org/ns/hasTarget";
        self.pundit_hasTag = "http://purl.org/pundit/ont/ao#hasTag";
        self.pundit_hasComment = "http://schema.org/comment";
        self.pundit_isIncludedIn = "http://purl.org/pundit/ont/ao#isIncludedIn";

        self.pundit_VocabCategory = "http://purl.org/pundit/vocab/category";
        */
        
        // Annotation server constants
        self.as                   = config.pundit.annotationServer;
        self.asApi                = self.as + "api/";
        
        /*
        self.asNbAnnList          = self.asApi + "notebooks/{id}/annotations/metadata";
        self.asNotebooksMeta      = self.asApi + "notebooks/{id}/metadata";
        self.asAnnGraph           = self.asApi + "annotations/{id}/graph";
        self.asAnnItems           = self.asApi + "annotations/{id}/items";
        self.asNotebooks          = self.asApi + "notebooks";
        self.asNotebookId         = self.asApi + "notebooks/{id}";
        self.asNotebooksGraph     = self.asApi + "notebooks/graph/";
        self.asCurrentNotebook    = self.asApi + "notebooks/current";
        self.asNotebooksActive    = self.asApi + "notebooks/active";

        self.asOpenNbAnnList      = self.asApi + "open/notebooks/{id}/annotations/metadata";
        self.asOpenNotebooksMeta  = self.asApi + "open/notebooks/{id}/metadata";
        self.asOpenAnnGraph       = self.asApi + "open/annotations/{id}/graph";
        self.asOpenAnnItems       = self.asApi + "open/annotations/{id}/items";

        self.asPublicNotebooks    = self.asApi + "open/notebooks/public/";

        self.asCreateAnnotation   = self.asApi + "notebooks/{id}?context={context}";

        self.asAnnotations        = self.asApi + "annotations/";
        self.asMetadataSearch     = self.asApi + "annotations/metadata/search";

        self.asStorage            = self.asApi + "services/preferences/";
        self.asVocabProxy         = self.asApi + "services/proxy";
        */
        
        self.asUsers              = self.asApi + "users/";
        self.asUsersCurrent       = self.asApi + "users/current";
        self.asUsersLogout        = self.asApi + "users/logout";

        self.asNotebooksOwned     = self.asApi + "notebooks/owned";

        self.asServPrefs          =self.asApi + "services/preferences/";

        /*
        self.lodLiveURL = "http://thepund.it/lodlive/app_en.html";
        self.notebooksNamespace = "http://swickynotes.org/notebook/resource/";
        self.usersNamespace = "http://swickynotes.org/notebook/resource/";
        
        self.dbpediaSpotlightAnnotate = "http://spotlight.dbpedia.org/rest/annotate?text=";
        self.dbpediaKeywordSearch = "http://lookup.dbpedia.org/api/search.asmx/KeywordSearch";
        */
        
        /**
            RDF predicates to object properties of items.
            Not present in this list: 
        
            .value which contains the full URI
        
            .rdfData which can get created by a .createBucketFor* method
            @const items
            @type Object
        **/
        self.items = {

            /** 
                Short label (usually 30-40 chars or so), see rdfs.label
                @const items.label 
            **/
            label: self.rdfs.label,

            /** 
                Preferred label
                @const items.prefLabel 
            **/
            prefLabel: "http://www.w3.org/2004/02/skos/core#prefLabel",

            /** 
                Alternative labels
                @const items.altLabel 
            **/
            altLabel: "http://www.w3.org/2004/02/skos/core#altLabel",

            /** 
                Long description or content of a text fragment
                @const items.description 
            **/
            description: "http://purl.org/dc/elements/1.1/description",

            /** 
                Image contained in the text fragment, or associated with the item
                @const items.image 
            **/
            image: "http://xmlns.com/foaf/0.1/depiction",

            // TODO: the items have an rdfType field which contains the types, call
            //       this rdfTypes as well?
            /** 
                Used for item types, see rdf.type
                @const items.type 
            **/
            type: self.rdf.type,

            /** 
                Web URL where the item has been created
                @const items.pageContext 
            **/
            pageContext: "http://purl.org/pundit/ont/ao#hasPageContext",

            /** 
                Closest named content or container for this item
                @const items.isPartOf 
            **/
            isPartOf: "http://purl.org/dc/terms/isPartOf",
            
            /** 
                TODO
                @const items.selector 
            **/
            selector: "http://www.w3.org/ns/openannotation/core/hasSelector",
            /** 
                TODO
                @const items.parentItemXP 
            **/
            parentItemXP: "http://purl.org/pundit/ont/ao#parentItemXP"
        };
        
        // DEBUG: this has to be moved to each annotator, not in the general conf
        self.fragments = {
            image: "http://purl.org/pundit/ont/ao#fragment-image",
            text: "http://purl.org/pundit/ont/ao#fragment-text"
        };
        
        
        self.selectors = {
            polygon: {
                value: "http://purl.org/pundit/ont/ao#selector-polygon",
                label: "Polygonal Selector",
                description: "A polygonal selection described by the coordinates of the its points normalized according to the resource image and width"
            },
            rectangle: {
                vale: "http://purl.org/pundit/ont/ao#selector-rectangle",
                label: "Rectangular Selector",
                description: "A polygonal selection described by the coordinates of the top left vertex, width and height normalized according to the resource image and width"
            }
        };
        
        self.fragmentBaseUri = "http://purl.org/pundit/fragment/";
        self.selectorBaseUri = "http://purl.org/pundit/selector/";
        
        /**
            RDF predicates to objects properties used by Notebooks
            @const notebooks
            @type Object
        **/
        self.notebooks = {
            /** 
                Name of the notebook
                @const notebooks.label
            **/
            label: self.rdfs.label,

            /** 
                Can be public or private
                @const notebooks.visibility
            **/
            visibility: 'http://open.vocab.org/terms/visibility',

            /** 
                TODO
                @const notebooks.created
            **/
            created: 'http://purl.org/dc/terms/created',

            /** 
                Creator and owner of the notebook
                @const notebooks.creator 
            **/
            creator: 'http://purl.org/dc/terms/creator',

            /** 
                Name of the creator and owner of the notebook
                @const notebooks.creatorName 
            **/
            creatorName: 'http://purl.org/dc/elements/1.1/creator',

            /** 
                Notebook's id
                @const notebooks.id
            **/
            id: 'http://purl.org/pundit/ont/ao#id',

            /** 
                Annotations this notebook includes
                @const notebooks.includes
            **/
            includes: 'http://purl.org/pundit/ont/ao#includes',

            /** 
                Rdf type of the notebook, see rdf_type
                @const notebooks.type
            **/
            type: self.rdf.type
        };
        
    } // constructor

    });
});