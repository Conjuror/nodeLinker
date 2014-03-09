#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys, getopt, codecs

#### PARAMETERS 
## Nodes
#  nodes = [{'nodeId'     : nodeId,
#            'nodeName'   : nodeName,
#            'parentId'   : parentId,
#            'nodeGroup'  : nodeGroup,
#            'groupAmount': groupAmount}]
nodes = []
## Relationship
#  rels = [{'relId'       : relId,
#           'source'      : nodeId,
#           'target'      : nodeId,
#           'relationship':relation}]
rels = []
## Links
#  links = [{'source'      : nodeId,
#            'target'      : nodeId,
#            'type'        : relationType,
#            'relationship': relationship,
#            'lid'          : gid}]
links = []
## Routes
#  routes = [{'nodes': [nodeId, nodeId],
#             'path' : [{'route': [linkId, ...],
#                        'node' : [nodeId, ...]}]}]
routes = []
gid = 0
routeLimit = 7

def initMap():
    global MAX
    for n in nodes:
        n['path'] = []

def dataGenerator(outputfile):
    f = codecs.open(outputfile, 'w', 'utf-8')
    ## dump link
    f.write('var links=[\n')
    for l in links:
        f.write('  {source: "'+nodes[l['source']]['nodeName']+'", target: "'+nodes[l['target']]['nodeName']+'", type: "'+l['type']+'", id: '+str(l['lid'])+', relationship: "'+l['relationship']+'"},\n')
    f.write('];\n\n')

    ## dump route
    f.write('var routes=[\n')
    for r in routes:
        f.write('  {"nodes": ["'+nodes[r['nodes'][0]]['nodeName']+'", "'+nodes[r['nodes'][1]]['nodeName']+'"], "path": [\n')
        for p in r['path']:
            f.write('    {"route": '+str(p['route'])+',\n     "node": [')
            if len(p['node']) > 0:
                f.write('"'+nodes[p['node'][0]]['nodeName']+'"')
                for n in p['node'][1:]:
                    f.write(',"'+nodes[n]['nodeName']+'"')
            f.write(']},\n')
        f.write('  ]},\n')
    f.write('];\n\n')
    f.close()

def routeGenerator():
    ## generate route
    global routeLimit

    for start in nodes[1:]:
        initMap()
        for l in links:
            if nodes[l['source']]['nodeId'] == start['nodeId']:
                nodes[l['target']]['path'].append([l['lid']])
            elif nodes[l['target']]['nodeId'] == start['nodeId']:
                nodes[l['source']]['path'].append([l['lid']])
        for r in range(2, routeLimit+1):
            for l in links:
                if len(nodes[l['source']]['path']) != 0 and len(nodes[l['source']]['path'][0]) == r-1 and nodes[l['target']]['nodeId'] != start['nodeId']:
                    if len(nodes[l['target']]['path']) == 0 or len(nodes[l['target']]['path'][0]) == r:
                        for i in nodes[l['source']]['path']:
                            nodes[l['target']]['path'].append(i+[l['lid']])
                if len(nodes[l['target']]['path']) != 0 and len(nodes[l['target']]['path'][0]) == r-1 and nodes[l['source']]['nodeId'] != start['nodeId']:
                    if len(nodes[l['source']]['path']) == 0 or len(nodes[l['source']]['path'][0]) == r:
                        for i in nodes[l['target']]['path']:
                            nodes[l['source']]['path'].append(i+[l['lid']])
        for t in nodes[1:]:
            if start['nodeId'] < t['nodeId'] and len(nodes[t['nodeId']]['path']) > 0:
                route = {'nodes':[start['nodeId'], t['nodeId']], 'path': []}
                for p in nodes[t['nodeId']]['path']:
                    path = {'route': p, 'node': []}
                    for l in p:
                        if not(links[l]['source'] in path['node']):
                            path['node'].append(links[l]['source'])
                        if not(links[l]['target'] in path['node']):
                            path['node'].append(links[l]['target'])
                    path['node'].remove(start['nodeId'])
                    path['node'].remove(t['nodeId'])
                    route['path'].append(path)
                routes.append(route)

def nodeLink(filename):
    f = codecs.open(filename, 'rb', 'utf-8')
    global gid
    for data in f.readlines()[1:]:
        ## do something
        # print data.strip().encode('big5')
        [nodeId, nodeName, parentId, nodeGroup, groupAmount, relation] = data.strip().split()
        nodes.insert(int(nodeId), {'nodeId':int(nodeId), 'nodeName':nodeName, 'parentId':parentId, 'nodeGroup':nodeGroup, 'groupAmount':groupAmount})
        links.append({'source':int(parentId), 'target':int(nodeId), 'type':'contain', 'relationship':relation, 'lid':gid})
        gid += 1
    f.close()

def relationLink(filename):
    f = codecs.open(filename, 'rb', 'utf-8')
    global gid
    for data in f.readlines()[1:]:
        ## do something
        # print data.strip().encode('big5')
        [relId, source, target, relation] = data.strip().split()
        rels.insert(int(relId), {'relId':int(relId), 'source':int(source), 'target':int(target), 'relationship':relation})
        links.append({'source':int(source), 'target':int(target), 'type':'resolve', 'relationship':relation, 'lid':gid})
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
    nodes.insert(0, {'nodeId':0, 'nodeName':u'海洋'})
    main(sys.argv[1:])
