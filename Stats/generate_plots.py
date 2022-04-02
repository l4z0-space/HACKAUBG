import numpy as np
import random
from plotly import graph_objs as go

def sankey(categories, spendings):

	source = np.zeros(len(categories)-1)
	target = np.arange(1,len(categories))
	value=np.insert(spendings, 0, np.sum(spendings), axis=0)
	labels = np.insert(categories,0,"Total expenses",axis=0)
	color_node = []
	color_link = []

	for i in range(len(categories)):
		color_node.append("#{:06x}".format(random.randint(0, 0xFFFFFF)))

	for i in range(len(categories)):
		color_link.append("#{:06x}".format(random.randint(0, 0xFFFFFF)))

	link = dict(source = source,
			target = target,
			value = value,
			color = color_node)
	node = dict(label=categories, pad=15, thickness=5, color=color_node)
	data = go.Sankey(link=link, node=node)
	#plot
	fig = go.Figure(data)
	fig.write_html("sankey.html")