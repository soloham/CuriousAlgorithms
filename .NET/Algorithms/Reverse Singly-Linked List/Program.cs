using System;
using System.Collections.Generic;

namespace Reverse_Singly_Linked_List
{
    partial class Program
    {
        static void Main(string[] args)
        {
            SinglyLinkedList<int> list = new SinglyLinkedList<int>();
            list.AddLast(1);
            list.AddLast(2);
            list.AddLast(3);
            list.AddLast(4);
            list.AddLast(5);

            Console.WriteLine("Normal:");
            list.PrintList();

            Console.WriteLine();
            var reversed = SinglyLinkedList<int>.ReverseList(list.Nodes[0]);
            Console.WriteLine("Reversed:");

            SinglyLinkedList<int>.PrintList(reversed);

            Console.ReadKey();

        }
    }
}
