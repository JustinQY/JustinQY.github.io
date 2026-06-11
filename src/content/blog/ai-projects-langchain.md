---
title: langChain
description: LangChain产品线以及文档拆分, 向量化技术栈总结 Use OpenAI's Models for this document. LangChain LangChain Initial a chat model Embedding Vector Store LangGraph Agent = control flow defined by an LLM
date: '2025-06-16T10:36:00.000Z'
draft: false
showHeroImage: false
tags: []
categories: []
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: true
---

LangChain产品线以及文档拆分, 向量化技术栈总结~~

> Use OpenAI's Models for this document.

# LangChain

![LangChain Products Architecture.png](/images/blog/screencatch/langchain_products_architecture.png)

## LangChain

```python
pip install -qU "langchain[openai]"
```

### Initial a chat model

```python
from langchain.chat_models import init_chat_model

model = init_chat_model("gpt-4o-mini", model_provider="openai")

model.invoke("Hello world")
```

### Embedding

### Vector Store

## LangGraph

Agent ~= control flow defined by an LLM

```python
pip install -U langgraph
```

### Node, Edge and State

- State: State is the input of the Graph. It can be a `TypedDict` datatype.
- Node: Each node modifies and returns a new state. It may contain some actions.
- Edge: Edges link the nodes. Each edge defines which node to visit from the current node based on some logics.

### State Schema

#### TypeDict

#### Dataclass

#### Pydantic

### State Reducer

### Graph Construction

```python
# Define State class
from typing_extensions import TypedDict

class State(TypedDict):
    graph_state: str

# Define a node
def node_1(state):
    return {"graph_state": state["graph_state"] + "something new"}

# Define an edge (conditional)
from typing import Literal

def decide_method(state) -> Literal["node_2", "node_3"]:
    if random.random() < 0.5:
        return "node_2"
    return "node_3"

# Construct a graph
from langgraph.graph import StateGraph, START, END

# build graph with a initial state
builder = StateGraph(State)

# Add some nodes to build graph
builder.add_node("node_1", node_1)

# Add some edges for logics
builder.add_edge(START, "node_1")  # means build an edge from 'START' to 'node_1'
builder.add_conditional_edges("node_1", decide_method)  # means which node we'll visit from 'node_1' depends on the logics in 'decide_method'
builder.add_edge("node_2", END)
builder.add_edge("node_3", END)

# Build the whole graph
graph = builder.compile()
```

### Graph Invocation

```python
graph.invoke({"graph_state" : "Hello world!"})
```

The output state of the graph will be the 'answer' of our LangGraph.

### Messages

Define messages for chat models. It's a list that preserves the conversation between user and llm.

```python
# Define messages list including some messages

from langchain_core.messages import AIMessage, HumanMessage

messages = [AIMessage(content=f"", name="Model")]
messages.append(HumanMessage(content=f"", name="Human"))

# System message
sys_msg = SystemMessage(content="You are a helpful assistant tasked with performing arithmetic on a set of inputs.")

# Invoke a LLM to response to this Message List

from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o")
result = llm.invoke(messages)

```

![Message Structure by LangGraph.png](/images/blog/screencatch/message_structure.png)

### Chain

A Chain can consist of several loops of operations and LLM invocation.

### Tools

We can define a function as a tool and bind it to the chat model. To use this tool, the model will add some payload to it.(e.g. Parse it by JSON, load the method name, params and so on.)

```python
llm = ChatOpenAI(model="gpt-4o")
llm_with_tools = llm.bind_tools([tool_method])
```

### Routers

The process of letting chat models to select which branch to visit is like a router. (Simple example of an Agent)

We can use build-in methods to implement tool nodes and conditional tool edges.

```python
from langgraph.prebuilt import ToolNode
from langgraph.prebuilt import tools_condition  # here 'tools_condition' is like a router

def tool_calling_llm(state):
    return {"messages": [llm_with_tools.invoke(state["messages"])]}

# First Define Nodes
builder = StateGraph(MessageState)
builder.add_node("tool_calling_llm", tool_calling_llm)
builder.add_note("tool_node", ToolNode(["tool_method"]))

# Then Define Edges
builder.add_edges(START, "tool_calling_llm")
builder.add_conditional_edges("tool_calling_llm", tools_condition)   # 'tools_condition' could choose to visit 'tool node' or End based on the llm's response
builder.add_edge("tool_node", END)

graph = builder.compile()
```

```python
START
  |
  |
  v
Tool_Condition_Node ---
  |                   |
  |                ToolNode
  |                   |
  v                   |
End <------------------
```

### Agent

We can build a generic agent architecture based on **ReAct**, which contains:

1. Act: let the model call tool methods
2. Observe: pass the tool output back to the model
3. Reason: let the model reason about the tool output to decide what to do next (e.g., call another tool or just respond directly)

```python
# Edge Tool Node back to LLM

builder.add_edge("tools", "assistant")


```

### Agent with Memory

With memory added to our agents, they will be able to handle multi-turn conversations.

LangGraph can use a checkpointer to automatically save the graph state after each step.

One of the easiest checkpointers to use is the MemorySaver, an in-memory key-value store for Graph state.

By adding memory, LangGraph will use `checkpoints` to automatically save graph state after each step. All these checkpoints will be saved in a `thread`.

1. `MemorySaver()` —— One of the easiest checkpointers

```python
# 'MemorySaver' is an in-memory key-value store for Graph state

from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()
react_graph_memory = builder.compile(checkpointer=memory)
```

2. `thread`

```python
# Use 'thread' to store our collection of states

config = {"configurable": {"thread_id": "1"}}

messages = react_graph_memory.invoke({"messages": messages}, config)
```

### LangGraph Studio

```python
langgraph dev

```

## LangSmith

LangSmith is like a monitor platform that could trace the pipeline of your LangChain and LangGraph process.

We can visualize each step of the progress, including the time cost, content and step name.
![LangSmith.png](/images/blog/screencatch/langsmith.png)

## FAISS

## Web Search

### Tavily

#### References

1. https://academy.langchain.com/courses/take/intro-to-langgraph
