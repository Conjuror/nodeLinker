#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys, getopt, codecs

node = []
rels = []
links = []
route = []
gid = 0

def dataGenerator(outputfile):
    f = codecs.open(outputfile, 'w', 'utf-8')
    ## dump link
    f.write('var links=[\n')
    for l in links:
        f.write('  {source: "'+l['source']+'", target: "'+l['target']+'", type: "'+l['type']+'", id: '+str(l['id'])+', relationship: "'+l['relationship']+'"},\n')
    f.write('];\n')

    ## dump route

    f.close()

def routeGenerator():
    ## generate route

def nodeLink(filename):
    f = codecs.open(filename, 'rb', 'utf-8')
    global gid
    for data in f.readlines()[1:]:
        ## do something
        # print data.strip().encode('big5')
        [nodeId, nodeName, parentId, nodeGroup, groupAmount, relation] = data.strip().split()
        node.insert(int(nodeId), {'nodeId':nodeId, 'nodeName':nodeName, 'parentId':parentId, 'nodeGroup':nodeGroup, 'groupAmount':groupAmount})
        links.append({'source':node[int(parentId)]['nodeName'], 'target':nodeName, 'type':'contain', 'relationship':relation, 'id':gid})
        gid += 1
    f.close()

def relationLink(filename):
    f = codecs.open(filename, 'rb', 'utf-8')
    global gid
    for data in f.readlines()[1:]:
        ## do something
        # print data.strip().encode('big5')
        [relId, nodeAId, nodeBId, relation] = data.strip().split()
        rels.insert(int(relId), {'relId':relId, 'nodeAId':nodeAId, 'nodeBId':nodeBId, 'relationship':relation})
        links.append({'source':node[int(nodeAId)]['nodeName'], 'target':node[int(nodeBId)]['nodeName'], 'type':'resolve', 'relationship':relation, 'id':gid})
        gid += 1
    f.close()

def main(argv):
    inputfile = ''
    outputfile = ''
    try:
        opts, args = getopt.getopt(argv,"ht:r:",["tree=","relation="])
    except getopt.GetoptError:
        print 'linkGenrator.py -t <treefile> -r <relationfile>'
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print 'linkGenrator.py -t <treefile> -r <relationfile>'
            sys.exit()
        elif opt in ("-t", "--tree"):
            inputfile = arg
            print 'tree file is ', inputfile
            nodeLink(inputfile)
        elif opt in ("-r", "--relation"):
            inputfile = arg
            print 'relation file is ', inputfile
            relationLink(inputfile)
    routeGenerator()
    dataGenerator(r'trinity/data.js')

if __name__ == "__main__":
    node.insert(0, {'nodeId':0, 'nodeName':u'海洋'})
    main(sys.argv[1:])
