using System;
using System.Collections.Generic;

namespace _6._Palindrome_Linked_List
{
    partial class Program
    {
        public class SinglyLinkedList<T>
        {
            public List<SinglyLinkedNode> Nodes = new List<SinglyLinkedNode>();

            public class SinglyLinkedNode
            {
                public T Data { get; set; }
                public SinglyLinkedNode Next { get; set; }
            }

            public void AddLast(T data)
            {
                SinglyLinkedNode item = new SinglyLinkedNode() { Data = data, Next = null };
                Nodes.Add(item);

                if (Nodes.Count > 1)
                {
                    Nodes[Nodes.Count - 2].Next = Nodes[Nodes.Count - 1];
                }
            }

            public static void PrintList(SinglyLinkedNode head)
            {
                var curNode = head;

                while (curNode != null)
                {
                    Console.Write($"{(curNode == head? "" : "->")}{curNode.Data}");
                    curNode = curNode.Next;
                }
                Console.WriteLine();
            }

            public void PrintList()
            {
                var curNode = Nodes[0];

                while (curNode != null)
                {
                    Console.Write($"{(curNode == Nodes[0] ? "" : "->")}{curNode.Data}");
                    curNode = curNode.Next;
                }

                Console.WriteLine();
            }
            
            public static SinglyLinkedNode ReverseList(SinglyLinkedNode head)
            {
                SinglyLinkedNode prev = null;

                while (head != null)
                {
                    var next = head.Next;
                    head.Next = prev;
                    prev = head;


                    head = next;
                }

                return prev;
            }
        }
    }
}
